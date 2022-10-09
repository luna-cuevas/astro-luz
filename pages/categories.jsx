import CategoryList from "../components/CategoryList";
import { commerce } from "../lib/commerce";

export async function getStaticProps() {
    const { data: categories } = await commerce.categories.list();
  
    return {
      props: {
        categories,
      },
    };
  }

export default function CategoriesPage({ categories }) {
    console.log(categories)
  return (
    <div>
      <h1>Categories</h1>

      <CategoryList categories={categories} />
    </div>
  );
}