import { useEffect, useState } from "react";

type WordPressPost = {
  date: string;
  excerpt: { rendered: string };
  id: number;
  slug: string;
  title: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
    "wp:term"?: Array<Array<{ name: string; taxonomy?: string }>>;
  };
};

const POSTS_PER_PAGE = 100;
const CATEGORIES = ["Eventos", "Negocios", "Bodas", "Conciertos"];
const CATEGORY_ALIASES: Record<string, string[]> = {
  Eventos: ["evento", "eventos"],
  Negocios: ["negocio", "negocios"],
  Bodas: ["boda", "bodas"],
  Conciertos: ["concierto", "conciertos"],
};
const POSTS_API_URL = new URL(
  "wp-json/wp/v2/posts",
  import.meta.env.VITE_WP_DOMAIN,
).toString();

function getPlainText(html: string) {
  return (
    new DOMParser()
      .parseFromString(html, "text/html")
      .body.textContent?.trim() ?? ""
  );
}

function normalizeCategory(category: string) {
  return category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLocaleLowerCase("es");
}

function getPostCategories(post: WordPressPost) {
  return (
    post._embedded?.["wp:term"]
      ?.flat()
      .filter((term) => term.taxonomy === "category")
      .map((term) => term.name) ?? []
  );
}

function postHasCategory(post: WordPressPost, category: string) {
  const aliases = CATEGORY_ALIASES[category].map(normalizeCategory);
  return getPostCategories(post).some((postCategory) =>
    aliases.includes(normalizeCategory(postCategory)),
  );
}

function PostCard({ post }: { post: WordPressPost }) {
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const title = getPlainText(post.title.rendered);
  const category = getPostCategories(post)[0];

  return (
    <article className="relative pb-16">
      <a
        className="block aspect-[4/3] overflow-hidden rounded-[26px] bg-[#dcd9e2]"
        href={`/blog/${post.slug}`}
        aria-label={`Leer ${title}`}
      >
        {featuredImage ? (
          <img
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || title}
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#5b20a0] via-[#35204b] to-[#17131d]" />
        )}
      </a>
      <div className="absolute inset-x-[11%] bottom-0 rounded-2xl bg-white/75 px-4 py-3 shadow-sm backdrop-blur-md sm:px-4">
        <div className="flex items-center justify-between gap-2">
          <span className="max-w-[65%] truncate rounded-md bg-white/90 px-2 py-1 text-[9px] font-semibold text-[#3b3740]">
            {category || "Artículo"}
          </span>
          <time
            className="shrink-0 text-[9px] font-medium text-[#5e5a61]"
            dateTime={post.date}
          >
            {new Date(post.date)
              .toLocaleDateString("es", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .replaceAll("/", "-")}
          </time>
        </div>
        <h3 className="mt-2 text-lg leading-tight text-[#242128]">
          <a
            className="transition-colors hover:text-[#6000cf]"
            href={`/blog/${post.slug}`}
          >
            {title}
          </a>
        </h3>
        <p className="mt-1 line-clamp-3 text-[12px] leading-[1.4] text-[#57535c]">
          {getPlainText(post.excerpt.rendered)}
        </p>
        <div className="mt-1 flex justify-end">
          <a
            className="inline-flex text-[#17131d] transition-colors hover:text-[#6000cf]"
            href={`/blog/${post.slug}`}
            aria-label={`Leer artículo: ${title}`}
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 4h6v6M20 4 11 13" />
              <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

function CategoryPostCard({
  post,
  featured = false,
}: {
  post: WordPressPost;
  featured?: boolean;
}) {
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const title = getPlainText(post.title.rendered);
  const category = getPostCategories(post)[0];

  if (featured) {
    return (
      <article className="group relative min-h-[320px] overflow-hidden rounded-2xl bg-[#dcd9e2] md:row-span-2 md:min-h-0">
        <a
          className="absolute inset-0"
          href={`/blog/${post.slug}`}
          aria-label={`Leer ${title}`}
        >
          {featuredImage ? (
            <img
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={featuredImage.source_url}
              alt={featuredImage.alt_text || title}
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#5b20a0] via-[#35204b] to-[#17131d]" />
          )}
        </a>
        <div className="absolute inset-x-[8%] bottom-[7%] rounded-2xl bg-white/75 px-4 py-3 shadow-sm backdrop-blur-md">
          <div className="flex items-center justify-between gap-2">
            <span className="max-w-[65%] truncate rounded-md bg-white/90 px-2 py-1 text-[9px] font-semibold text-[#3b3740]">
              {category || "Artículo"}
            </span>
            <time
              className="shrink-0 text-[9px] font-medium text-[#5e5a61]"
              dateTime={post.date}
            >
              {new Date(post.date)
                .toLocaleDateString("es", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .replaceAll("/", "-")}
            </time>
          </div>
          <h3 className="mt-2 text-lg leading-tight text-[#242128]">
            <a
              className="transition-colors hover:text-[#6000cf]"
              href={`/blog/${post.slug}`}
            >
              {title}
            </a>
          </h3>
          <p className="mt-1 line-clamp-3 text-[11px] leading-[1.4] text-[#57535c]">
            {getPlainText(post.excerpt.rendered)}
          </p>
          <div className="mt-1 flex justify-end">
            <a
              className="inline-flex text-[#17131d] transition-colors hover:text-[#6000cf]"
              href={`/blog/${post.slug}`}
              aria-label={`Leer artículo: ${title}`}
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 4h6v6M20 4 11 13" />
                <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
              </svg>
            </a>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex min-h-[190px] overflow-hidden rounded-xl bg-white">
      <a
        className="block w-[38%] shrink-0 overflow-hidden bg-[#dcd9e2]"
        href={`/blog/${post.slug}`}
        aria-label={`Leer ${title}`}
      >
        {featuredImage ? (
          <img
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || title}
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#5b20a0] via-[#35204b] to-[#17131d]" />
        )}
      </a>
      <div className="flex min-w-0 flex-1 flex-col p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="max-w-[60%] truncate rounded bg-[#f1f2f6] px-2 py-1 text-[9px] font-semibold text-[#3b3740]">
            {category || "Artículo"}
          </span>
          <time
            className="shrink-0 text-[9px] font-semibold text-[#5e5a61]"
            dateTime={post.date}
          >
            {new Date(post.date)
              .toLocaleDateString("es", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .replaceAll("/", "-")}
          </time>
        </div>
        <h3 className="mt-2 text-base leading-tight text-[#242128]">
          <a
            className="transition-colors hover:text-[#6000cf]"
            href={`/blog/${post.slug}`}
          >
            {title}
          </a>
        </h3>
        <p className="mt-2 line-clamp-3 text-[12px] leading-[1.4] text-[#57535c]">
          {getPlainText(post.excerpt.rendered)}
        </p>
        <a
          className="mt-auto self-end pt-2 text-[#17131d] transition-colors hover:text-[#6000cf]"
          href={`/blog/${post.slug}`}
          aria-label={`Leer artículo: ${title}`}
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 4h6v6M20 4 11 13" />
            <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
          </svg>
        </a>
      </div>
    </article>
  );
}

async function fetchAllPosts(signal: AbortSignal) {
  const posts: WordPressPost[] = [];
  let page = 1;
  let totalPages: number | undefined;

  do {
    const url = new URL(POSTS_API_URL);
    url.searchParams.set("per_page", String(POSTS_PER_PAGE));
    url.searchParams.set("page", String(page));
    url.searchParams.set("_embed", "1");

    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error(`WordPress respondió con el estado ${response.status}.`);
    }

    const pagePosts = (await response.json()) as WordPressPost[];
    posts.push(...pagePosts);

    const totalPagesHeader = response.headers.get("X-WP-TotalPages");
    if (totalPagesHeader) {
      const parsedTotalPages = Number(totalPagesHeader);
      if (Number.isFinite(parsedTotalPages)) totalPages = parsedTotalPages;
    }

    page += 1;
    if (totalPages === undefined && pagePosts.length < POSTS_PER_PAGE) break;
  } while (totalPages === undefined || page <= totalPages);

  return posts;
}

export default function Blog() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      setIsLoading(true);
      setError("");

      try {
        const allPosts = await fetchAllPosts(controller.signal);
        setPosts(allPosts);
      } catch (loadError) {
        if (controller.signal.aborted) return;
        setError(
          loadError instanceof Error
            ? `No fue posible cargar los artículos. ${loadError.message}`
            : "No fue posible cargar los artículos. Inténtalo de nuevo.",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadPosts();
    return () => controller.abort();
  }, [reloadKey]);

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const latestPosts = sortedPosts.slice(0, 3);
  const filteredPosts = selectedCategory
    ? sortedPosts.filter((post) => postHasCategory(post, selectedCategory))
    : sortedPosts;

  return (
    <main className="min-h-[60vh] bg-[#f1f2f6] px-5 pb-20 pt-14 sm:px-8 sm:pb-24 sm:pt-16">
      <div className="mx-auto ">
        <header className="mb-16 text-center sm:mb-[4.5rem]">
          <h1 className="text-2xl text-[#38007b] sm:text-[26px]">Blog</h1>
          <p className="mx-auto mt-2 max-w-md text-base leading-5 text-[#77777b]">
            Descubre los mejores eventos, conciertos y experiencias musicales.
          </p>
        </header>

        {isLoading && (
          <p className="py-12 text-center text-[#5d5863]" role="status">
            Cargando artículos...
          </p>
        )}

        {!isLoading && error && (
          <div className="py-10 text-center" role="alert">
            <p className="text-[#5d5863]">{error}</p>
            <button
              className="mt-5 rounded-md bg-[#6000cf] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#5100b5]"
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
            >
              Intentar de nuevo
            </button>
          </div>
        )}

        {!isLoading && !error && posts.length === 0 && (
          <p className="py-12 text-center text-[#5d5863]">
            Aún no hay artículos publicados.
          </p>
        )}

        {!isLoading && !error && posts.length > 0 && (
          <>
            <section aria-labelledby="latest-posts-heading" className="mx-auto max-w-260">
              <h2
                className="mb-8 text-center text-xl text-[#38007b] sm:text-2xl"
                id="latest-posts-heading"
              >
                Últimos artículos
              </h2>
              <div className="grid gap-x-4 gap-y-24 sm:grid-cols-2 lg:grid-cols-3">
                {latestPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </section>
            <div
              className="flex min-h-16 flex-wrap items-center justify-center gap-3 bg-white px-5 py-4 sm:gap-6 mt-18 w-full"
              aria-label="Filtrar artículos por categoría"
            >
              {CATEGORIES.map((category) => (
                <button
                  className={`min-w-24 rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${
                    selectedCategory === category
                      ? "bg-[#38007b] text-white"
                      : "bg-[#f1f2f6] text-[#34313a] hover:bg-[#e7e8ed]"
                  }`}
                  type="button"
                  key={category}
                  aria-pressed={selectedCategory === category}
                  onClick={() =>
                    setSelectedCategory((current) =>
                      current === category ? null : category,
                    )
                  }
                >
                  {category}
                </button>
              ))}
            </div>
            <section
              className="relative  overflow-hidden"
              aria-label="Artículos por categoría"
            >
              <div className="mx-auto max-w-[1040px] px-5 pt-8 sm:px-8">
                {selectedCategory && (
                  <p className="mb-6 text-center">
                    <button
                      className="font-heading text-[#6000cf] hover:underline"
                      type="button"
                      onClick={() => setSelectedCategory(null)}
                    >
                      Ver todos los artículos
                    </button>
                  </p>
                )}

                {filteredPosts.length > 0 ? (
                  <div className="grid gap-4 md:auto-rows-[190px] md:grid-cols-2">
                    {filteredPosts.map((post, index) => (
                      <CategoryPostCard
                        key={post.id}
                        post={post}
                        featured={index === 0}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="py-8 text-center text-[#5d5863]">
                    No hay artículos en esta categoría todavía.
                  </p>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
