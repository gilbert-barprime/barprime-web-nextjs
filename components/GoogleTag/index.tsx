export default function GoogleTag() {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_TAG_ID}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${process.env.GOOGLE_TAG_ID}'${
            process.env.VERCEL_ENV === "production"
              ? ""
              : `, { 'debug_mode':true }`
          });
                    `,
        }}
      />
    </>
  );
}
