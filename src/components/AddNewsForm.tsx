import { useFormik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import { News } from '../config/rrf';
import './AddNewsForm.scss';

interface AddNewsFormProps {
  className?: string;
  onSubmit: (newInstance: News) => void;
}

export const AddNewsForm = ({ className, onSubmit }: AddNewsFormProps) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      excerpt: '',
      full: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, 'Заголовок должен быть не менее 5 символов')
        .required('Обязательно для заполнения'),
      excerpt: Yup.string()
        .min(20, 'Краткое описание должно быть не менее 20 символов')
        .required('Обязательно для заполнения'),
      full: Yup.string()
        .min(20, 'Полное содержание должно быть не менее 20 символов')
        .required('Обязательно для заполнения'),
    }),
    onSubmit: (values) => {
      onSubmit({ ...values, isApproved: false });
    },
  });

  return (
    <form className={cn('add-news', className)} onSubmit={formik.handleSubmit}>
      <input
        className="add-news__field"
        type="text"
        placeholder="Заголовок"
        {...formik.getFieldProps('title')}
      />
      {formik.touched.title && formik.errors.title ? (
        <div>{formik.errors.title}</div>
      ) : null}
      <input
        className="add-news__field"
        type="text"
        placeholder="Выдержка"
        {...formik.getFieldProps('excerpt')}
      />
      {formik.touched.excerpt && formik.errors.excerpt ? (
        <div>{formik.errors.excerpt}</div>
      ) : null}
      <textarea
        className="add-news__field"
        placeholder="Полный текст"
        {...formik.getFieldProps('full')}
      />
      {formik.touched.full && formik.errors.full ? (
        <div>{formik.errors.full}</div>
      ) : null}
      <button type="submit">Добавить новость</button>
    </form>
  );
};
