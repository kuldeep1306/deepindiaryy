import { useEffect, useMemo, useState } from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import Posts from './components/Posts';
import StoryModal from './components/StoryModal';
import FeedbackModal from './components/FeedbackModal';
import AdminPage from './components/AdminPage';
import ShareStory from './components/ShareStory';
import About from './components/About';
import Trending from './components/Trending';
import Footer from './components/Footer';
import ApprovedStories from './components/ApprovedStories';

const THEME_KEY = 'autoBlogTheme';
const ADMIN_SESSION_KEY = 'deepindiary_admin_pw';

// Simple path router
function useRoute() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const handler = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);
  return path;
}

export default function App() {
  const API_URL = import.meta.env.VITE_API_URL || '';
  const route = useRoute();

  const [posts, setPosts]               = useState([]);
  const [search, setSearch]             = useState('');
  const [categoryFilter]                = useState('');
  const [isMenuOpen, setIsMenuOpen]     = useState(false);
  const [theme, setTheme]               = useState('light');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Agar admin session active hai toh delete button dikhe
  const adminPassword = sessionStorage.getItem(ADMIN_SESSION_KEY) || '';
  const isAdmin = Boolean(adminPassword);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');

    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/posts`);
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        if (data.length) setPosts(data);
      } catch (err) {
        console.error('Post fetch error:', err);
      }
    };
    fetchPosts();
  }, [API_URL]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const filteredPosts = useMemo(() => {
    let result = posts;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        [p.title, p.excerpt, p.author, p.category].join(' ').toLowerCase().includes(q)
      );
    }
    if (categoryFilter) {
      result = result.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase());
    }
    return result;
  }, [posts, search, categoryFilter]);

  const deletePost = async (postId) => {
    if (!adminPassword) return;
    if (!confirm('Is post ko permanently delete karna chahte ho?')) return;
    try {
      const res = await fetch(`${API_URL}/api/posts`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: postId, password: adminPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setPosts(prev => prev.filter(p => p.id !== postId));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  // /admin route — password-protected admin page
  if (route === '/admin') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--paper)', color: 'var(--ink)' }}>
        <AdminPage
          apiUrl={API_URL}
          onPostAdded={post => setPosts(prev => [post, ...prev])}
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', color: 'var(--ink)' }}>
      <Header
        theme={theme}
        toggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        showAdminSection={isAdmin}
        setShowAdminSection={() => {}}
        setShowFeedback={setShowFeedback}
      />

      <main className="space-y-24 pb-24">
        <Hero />

        <Posts
          posts={filteredPosts}
          search={search}
          setSearch={setSearch}
          categoryFilter={categoryFilter}
          onRead={setSelectedPost}
          onDelete={deletePost}
          showDelete={isAdmin}
        />

        <ShareStory apiUrl={API_URL} />

        {/* Approved user stories — public section */}
        <ApprovedStories apiUrl={API_URL} />

        <About />

        <Trending
          posts={posts}
          onRead={setSelectedPost}
          onDelete={deletePost}
          showDelete={isAdmin}
        />
      </main>

      <Footer />

      <StoryModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      {showFeedback && <FeedbackModal apiUrl={API_URL} onClose={() => setShowFeedback(false)} />}
    </div>
  );
}
