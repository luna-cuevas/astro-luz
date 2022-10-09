import ProductList from "../../components/ProductList";
import { commerce } from "../../lib/commerce";

export default function CategoryPage({ category, products }) {
  return (
    <div>
      <h1>{category.name}</h1>
      test
      <ProductList products={products.data} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const category = await commerce.categories.retrieve(slug, {
    type: "slug",
  });
  
  const products = await commerce.products.list({
    category_slug: [slug],
  });

  return {
    props: {
      category,
      products,
    },
  };
}

export async function getStaticPaths() {
  const allPaths = []
  const { data: categories } = await commerce.categories.list();
  categories?.map(category => {
    category.children?.map(child => allPaths.push(child))
  })

  return {
    paths: allPaths?.map((category) => ({
      params: {
        slug: category.slug,
      },
    })),
    fallback: false,
  };
}
