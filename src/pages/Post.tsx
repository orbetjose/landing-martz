import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import NotFound from "./NotFound";

type WordPressPost = {
  date: string;
  content: { rendered: string };
  excerpt?: { rendered: string };
  id: number;
  slug: string;
  title: { rendered: string };
  acf?: {
    meta_title?: string | null;
    meta_description?: string | null;
    keyword_principal?: string | null;
    keyboard_secundaria?: string | string[] | null;
  } | null;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
  };
};

const POSTS_API_URL = new URL(
  "wp-json/wp/v2/posts",
  import.meta.env.VITE_WP_DOMAIN,
).toString();

function getPlainText(value: string) {
  return new DOMParser().parseFromString(value, "text/html").body.textContent?.trim() ?? "";
}

function getSecondaryKeywords(value: string | string[] | null | undefined) {
  const keywords = Array.isArray(value) ? value : value?.split(",");
  return (keywords ?? []).map((keyword) => keyword.trim()).filter(Boolean);
}

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPost() {
      setIsLoading(true);
      setIsNotFound(false);
      setError("");
      setPost(null);

      try {
        const url = new URL(POSTS_API_URL);
        url.searchParams.set("slug", slug ?? "");
        url.searchParams.set("_embed", "wp:featuredmedia");

        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`WordPress respondió con el estado ${response.status}.`);
        }

        const matchingPosts = (await response.json()) as WordPressPost[];
        const matchingPost = matchingPosts.find((item) => item.slug === slug);
        if (!matchingPost) {
          setIsNotFound(true);
          return;
        }

        setPost(matchingPost);
      } catch (loadError) {
        if (controller.signal.aborted) return;
        setError(
          loadError instanceof Error
            ? `No fue posible cargar el artículo. ${loadError.message}`
            : "No fue posible cargar el artículo. Inténtalo de nuevo.",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadPost();
    return () => controller.abort();
  }, [slug, reloadKey]);

  if (isLoading) {
    return (
      <main className="min-h-[60vh] bg-[#f1f2f6] px-5 py-16">
        <p className="text-center text-[#5d5863]" role="status">
          Cargando artículo...
        </p>
      </main>
    );
  }

  if (isNotFound) return <NotFound />;

  if (error) {
    return (
      <main className="min-h-[60vh] bg-[#f1f2f6] px-5 py-16 text-center">
        <p className="text-[#5d5863]" role="alert">{error}</p>
        <button
          className="mt-5 rounded-md bg-[#38007b] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#6000cf]"
          type="button"
          onClick={() => setReloadKey((key) => key + 1)}
        >
          Intentar de nuevo
        </button>
      </main>
    );
  }

  if (!post) return <NotFound />;

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const title = getPlainText(post.title.rendered);
  const metaTitle = post.acf?.meta_title?.trim() || title;
  const metaDescription =
    getPlainText(post.acf?.meta_description ?? "") ||
    getPlainText(post.excerpt?.rendered ?? "");
  const primaryKeyword = post.acf?.keyword_principal?.trim();
  const secondaryKeywords = getSecondaryKeywords(post.acf?.keyboard_secundaria);
  const keywords = [primaryKeyword, ...secondaryKeywords]
    .filter((keyword): keyword is string => Boolean(keyword))
    .join(", ");

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        {metaDescription && <meta name="description" content={metaDescription} />}
        {keywords && <meta name="keywords" content={keywords} />}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={metaTitle} />
        {metaDescription && (
          <meta property="og:description" content={metaDescription} />
        )}
        {featuredImage && (
          <meta property="og:image" content={featuredImage.source_url} />
        )}
        <meta name="twitter:card" content={featuredImage ? "summary_large_image" : "summary"} />
        <meta name="twitter:title" content={metaTitle} />
        {metaDescription && (
          <meta name="twitter:description" content={metaDescription} />
        )}
      </Helmet>
      <main className="min-h-[60vh] bg-[#f1f2f6] px-5 pb-20 pt-10 sm:px-8 sm:pb-24 sm:pt-14">
        <article className="mx-auto max-w-4xl">
          {featuredImage && (
            <img
              className="mb-8 max-h-[460px] w-full rounded-2xl object-cover"
              src={featuredImage.source_url}
              alt={featuredImage.alt_text || ""}
            />
          )}
          <header className="mb-8">
            <time
              className="text-sm font-medium text-[#77717e]"
              dateTime={post.date}
            >
              {new Date(post.date).toLocaleDateString("es", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <h1 className="mt-3 text-3xl leading-tight text-[#38007b] sm:text-4xl">
              {title}
            </h1>
          </header>
          <div
            className="space-y-5 break-words text-[#34313a] [&_a]:text-[#6000cf] [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-[#6000cf] [&_blockquote]:pl-5 [&_figcaption]:mt-2 [&_figcaption]:text-sm [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:text-[#242128] [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:text-[#242128] [&_img]:h-auto [&_img]:max-w-full [&_li]:ml-6 [&_li]:list-disc [&_ol_li]:list-decimal [&_p]:leading-6 [&_ul]:space-y-2"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </article>
      </main>
    </>
  );
}
