import dotenv from 'dotenv';
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.MONGODB_DB || 'deepindiary';

app.use(express.json({ limit: '10mb' }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const client = new MongoClient(mongoUri);
let postsCollection;

async function connectDb() {
  if (!postsCollection) {
    await client.connect();
    const db = client.db(dbName);
    postsCollection = db.collection('posts');
  }
  return client.db(dbName);
}

function checkAdminPassword(password) {
  return password && password === process.env.ADMIN_PASSWORD;
}

// Admin login verify
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (!checkAdminPassword(password)) return res.status(403).json({ message: 'Invalid admin password.' });
  res.json({ success: true });
});

// POSTS
app.get('/api/posts', async (req, res) => {
  try {
    const db = await connectDb();
    const posts = await db.collection('posts').find().sort({ published: -1, _id: -1 }).toArray();
    res.json(posts);
  } catch (err) { res.status(500).json({ message: 'Unable to load posts.' }); }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { post, password } = req.body;
    if (!checkAdminPassword(password)) return res.status(403).json({ message: 'Unauthorized.' });
    if (!post?.title?.trim() || !post?.author?.trim() || !post?.category?.trim() || !post?.published || post?.readTime == null || !post?.excerpt?.trim()) {
      return res.status(400).json({ message: 'Missing required post fields.' });
    }
    const db = await connectDb();
    const result = await db.collection('posts').insertOne({ ...post, createdAt: new Date() });
    res.status(201).json({ _id: result.insertedId, ...post });
  } catch (err) { res.status(500).json({ message: 'Unable to save post.' }); }
});

app.delete('/api/posts', async (req, res) => {
  try {
    const { id, password } = req.body;
    if (!id) return res.status(400).json({ message: 'Post id required' });
    if (!checkAdminPassword(password)) return res.status(403).json({ message: 'Invalid password' });
    const db = await connectDb();
    const result = await db.collection('posts').deleteOne({ id: Number(id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) { res.status(500).json({ message: 'Delete failed' }); }
});

// SUBSCRIBE
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required.' });
    const db = await connectDb();
    const existing = await db.collection('subscribers').findOne({ email });
    if (existing) return res.status(400).json({ message: 'Already subscribed.' });
    await db.collection('subscribers').insertOne({ email, subscribedAt: new Date() });
    res.status(201).json({ message: 'Subscribed successfully.' });
  } catch (err) { res.status(500).json({ message: 'Unable to subscribe.' }); }
});

// USER SUBMISSIONS (public submit)
app.post('/api/submissions', async (req, res) => {
  try {
    const submission = req.body;
    if (!submission?.name || !submission?.email || !submission?.phone || !submission?.story) {
      return res.status(400).json({ message: 'Missing required submission fields.' });
    }
    const db = await connectDb();
    await db.collection('dailyLimits').createIndex({ date: 1 }, { unique: true });
    const today = new Date().toISOString().split('T')[0];
    // Pehle check karo current count
    const limitDoc = await db.collection('dailyLimits').findOne({ date: today });
    if (limitDoc && limitDoc.count >= 10) {
      return res.status(429).json({ message: 'Only 10 stories can be submitted per day.' });
    }
    // Count increment karo (upsert)
    await db.collection('dailyLimits').updateOne(
      { date: today },
      { $inc: { count: 1 } },
      { upsert: true }
    );
    await db.collection('submissions').insertOne({ ...submission, status: 'pending', submittedAt: new Date() });
    res.status(201).json({ message: 'Story submitted successfully' });
  } catch (err) { res.status(500).json({ message: 'Unable to submit story.' }); }
});

// PUBLIC: approved submissions
app.get('/api/submissions/approved', async (req, res) => {
  try {
    const db = await connectDb();
    const approved = await db.collection('submissions').find({ status: 'approved' }).sort({ reviewedAt: -1 }).toArray();
    const safe = approved.map(({ _id, name, story, submittedAt, reviewedAt }) => ({ _id, name, story, submittedAt, reviewedAt }));
    res.json(safe);
  } catch (err) { res.status(500).json({ message: 'Unable to load approved stories.' }); }
});

// ADMIN: get all submissions
app.get('/api/admin/submissions', async (req, res) => {
  try {
    const { password, status } = req.query;
    if (!checkAdminPassword(password)) return res.status(403).json({ message: 'Unauthorized' });
    const db = await connectDb();
    const query = status && status !== 'all' ? { status } : {};
    const submissions = await db.collection('submissions').find(query).sort({ submittedAt: -1 }).toArray();
    res.json(submissions);
  } catch (err) { res.status(500).json({ message: 'Unable to load submissions.' }); }
});

// ADMIN: approve or reject
app.patch('/api/admin/submissions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { password, action } = req.body;
    if (!checkAdminPassword(password)) return res.status(403).json({ message: 'Unauthorized' });
    if (!['approve', 'reject'].includes(action)) return res.status(400).json({ message: 'Invalid action' });
    const db = await connectDb();
    const newStatus = action === 'approve' ? 'approved' : 'rejected';
    const updated = await db.collection('submissions').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { status: newStatus, reviewedAt: new Date() } },
      { returnDocument: 'after' }
    );
    if (!updated) return res.status(404).json({ message: 'Submission not found' });
    res.json({ message: `Submission ${newStatus}`, submission: updated });
  } catch (err) { res.status(500).json({ message: 'Update failed' }); }
});

// ADMIN: delete submission
app.delete('/api/admin/submissions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    if (!checkAdminPassword(password)) return res.status(403).json({ message: 'Unauthorized' });
    const db = await connectDb();
    const result = await db.collection('submissions').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Submission deleted' });
  } catch (err) { res.status(500).json({ message: 'Delete failed' }); }
});

// FEEDBACK
app.post('/api/feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: 'All fields are required' });
    const db = await connectDb();
    await db.collection('feedback').insertOne({ name, email, message, createdAt: new Date() });
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) { res.status(500).json({ message: 'Unable to save feedback' }); }
});

// ADMIN - GET ALL FEEDBACK
app.get('/api/admin/feedback', async (req, res) => {
  try {
    const { password } = req.query;
    if (password !== process.env.ADMIN_PASSWORD) return res.status(403).json({ message: 'Unauthorized' });
    const db = await connectDb();
    const feedbacks = await db.collection('feedback').find({}).sort({ createdAt: -1 }).toArray();
    res.json(feedbacks);
  } catch (err) { res.status(500).json({ message: 'Unable to fetch feedback' }); }
});

// ADMIN - DELETE FEEDBACK
app.delete('/api/admin/feedback/:id', async (req, res) => {
  try {
    const { password } = req.body;
    if (!checkAdminPassword(password)) return res.status(403).json({ message: 'Unauthorized' });
    const db = await connectDb();
    const result = await db.collection('feedback').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Feedback not found' });
    res.json({ message: 'Feedback deleted' });
  } catch (err) { res.status(500).json({ message: 'Unable to delete feedback' }); }
});

// REACTIONS
app.get('/api/reactions/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const db = await connectDb();
    const doc = await db.collection('reactions').findOne({ postId });
    res.json(doc?.counts || { like: 0, fire: 0, cry: 0, mind: 0 });
  } catch (err) { res.status(500).json({ message: 'Unable to load reactions.' }); }
});

app.post('/api/reactions/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { reaction, prevReaction, remove } = req.body;
    const allowed = ['like', 'fire', 'cry', 'mind'];
    if (!allowed.includes(reaction)) return res.status(400).json({ message: 'Invalid reaction type.' });
    const db = await connectDb();
    let update = {};
    if (remove) {
      update = { $inc: { [`counts.${reaction}`]: -1 } };
    } else if (prevReaction && allowed.includes(prevReaction) && prevReaction !== reaction) {
      update = { $inc: { [`counts.${prevReaction}`]: -1, [`counts.${reaction}`]: 1 } };
    } else {
      update = { $inc: { [`counts.${reaction}`]: 1 } };
    }
    await db.collection('reactions').updateOne({ postId }, update, { upsert: true });
    await db.collection('reactions').updateOne(
      { postId },
      [{ $set: {
        'counts.like': { $max: ['$counts.like', 0] },
        'counts.fire': { $max: ['$counts.fire', 0] },
        'counts.cry':  { $max: ['$counts.cry',  0] },
        'counts.mind': { $max: ['$counts.mind', 0] },
      }}]
    );
    const updated = await db.collection('reactions').findOne({ postId });
    res.json(updated.counts);
  } catch (err) { res.status(500).json({ message: 'Unable to save reaction.' }); }
});

app.listen(port, () => {
  console.log(`✅ DeepInDiary API running at http://localhost:${port}`);
});
