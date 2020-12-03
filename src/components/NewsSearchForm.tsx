import { useState } from 'react';
import cn from 'classnames';
import './NewsSearchForm.scss';

interface NewsSearchFormProps {
  className?: string;
  filterNews: (query: string) => void;
}

export const NewsSearchForm = (props: NewsSearchFormProps) => {
  const { filterNews, className } = props;
  const [search, setSearch] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    filterNews(search);
  };

  return (
    <form className={cn('news-search-form', className)}>
      <input
        className="news-search-form__input"
        type="search"
        placeholder="Поиск"
        value={search}
        onChange={handleChange}
      />
    </form>
  );
};
