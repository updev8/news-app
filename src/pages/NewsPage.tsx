import { useState } from 'react';
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase';
import { News } from '../config/rrf';
import { Loader } from '../components/Loader';
import { AddNewsForm } from '../components/AddNewsForm';
import { NewsList } from '../components/NewsList';
import { useLoggedIn } from '../hooks/useLoggedIn';
import './NewsPage.scss';
import Fuse from 'fuse.js';
import { NewsSearchForm } from '../components/NewsSearchForm';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface FilteredNews {
  key: string;
  value: News;
}

export const NewsPage = () => {
  useFirebaseConnect((props) => ({
    path: 'news',
    queryParams: ['orderByChild=added'],
  }));
  const { isLoggedIn } = useLoggedIn();
  const auth = useSelector((state: RootState) => state.firebase.auth);
  const firebase = useFirebase();
  const news = useSelector((state: RootState) => state.firebase.ordered.news);
  const [filteredNews, setFilteredNews] = useState<FilteredNews[]>([]);

  const addNewsItem = (newInstance: News) => {
    firebase
      .push('news', {
        ...newInstance,
        createdBy: auth.uid,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      })
      .catch((err) => {
        console.error('addProject Error:', err);
      });
  };

  const deleteNewsItem = (id: string) => {
    firebase.remove(`news/${id}`).catch((err) => {
      console.error('deleteNewsItem Error:', err);
    });
  };

  const approveNewsItem = (id: string) => {
    firebase.update(`news/${id}`, { isApproved: true });
  };

  const filterNews = (query: string) => {
    if (query.length < 2) {
      setFilteredNews(news);
    } else {
      const options = { keys: ['value.title', 'value.excerpt', 'value.full'] };
      const fuse = new Fuse(news, options);
      const result = fuse.search(query);

      setFilteredNews(result.map((item) => item.item));
    }
  };

  const renderNewsList = () => {
    if (news) {
      return (
        <NewsList
          news={filteredNews.length ? filteredNews : news}
          onDelete={deleteNewsItem}
          onApprove={approveNewsItem}
        />
      );
    }

    if (news === null) return <p>Новостей пока нет</p>;
    return <Loader />;
  };

  return (
    <main className="news-page container">
      {isLoggedIn && (
        <AddNewsForm className="news-page__add-news" onSubmit={addNewsItem} />
      )}
      <NewsSearchForm className="news-page__search" filterNews={filterNews} />
      {renderNewsList()}
    </main>
  );
};
