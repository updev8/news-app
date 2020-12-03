import cn from 'classnames';
import { useSelector } from 'react-redux';
import { News } from '../config/rrf';
import { useLoggedIn } from '../hooks/useLoggedIn';
import { RootState } from '../store/store';
import './NewsItem.scss';

interface NewsItemProps extends News {
  id: string;
  className?: string;
  onDelete: (id: string) => void;
  onApprove: (id: string) => void;
}

export const NewsItem: React.FC<NewsItemProps> = (props) => {
  const {
    id,
    title,
    excerpt,
    className,
    onDelete,
    onApprove,
    isApproved,
    createdAt,
  } = props;

  const { isLoggedIn } = useLoggedIn();
  const userRole = useSelector(
    (state: RootState) => state.firebase.profile.role
  );

  const dateTime = new Date((createdAt as number) * 1000).toString();

  return (
    <article className={cn('news-item', className)}>
      <h2>{title}</h2>
      <time dateTime={dateTime}>Дата создания: {dateTime}</time>
      <p>{excerpt}</p>

      <footer className="news-item__footer">
        {isLoggedIn && userRole === 'admin' && (
          <div>
            {!isApproved && (
              <button onClick={() => onApprove(id)}>Одобрить</button>
            )}

            <button onClick={() => onDelete(id)}>Удалить</button>
          </div>
        )}

        {!isApproved && <div>'Новость ожидает одобрения администратором'</div>}
      </footer>
    </article>
  );
};
