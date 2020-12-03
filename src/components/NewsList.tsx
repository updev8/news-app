import { useSelector } from 'react-redux';
import { News } from '../config/rrf';
import { RootState } from '../store/store';
import { NewsItem } from './NewsItem';
import './NewsList.scss';

interface NewsListProps {
  onDelete: (id: string) => void;
  onApprove: (id: string) => void;
  news: {
    key: string;
    value: News;
  }[];
}

export const NewsList: React.FC<NewsListProps> = ({
  news,
  onDelete,
  onApprove,
}) => {
  const userRole = useSelector(
    (state: RootState) => state.firebase.profile.role
  );

  const isGuest = userRole !== 'author' && userRole !== 'admin';

  return (
    <div className="news-list">
      {news.map(({ key, value }) => {
        const newsItem = (
          <NewsItem
            className="news-list__item"
            {...value}
            id={key}
            onDelete={onDelete}
            onApprove={onApprove}
            key={key}
          />
        );

        if (isGuest && value.isApproved) return newsItem;
        if (!isGuest) return newsItem;
        return null;
      })}
    </div>
  );
};
