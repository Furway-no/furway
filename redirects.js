const redirects = async () => {
  const internetExplorerRedirect = {
    destination: "/ie-incompatible.html",
    has: [
      {
        key: "user-agent",
        type: "header",
        value: "(.*Trident.*)", // all ie browsers
      },
    ],
    permanent: false,
    source: "/:path((?!ie-incompatible.html$).*)", // all pages except the incompatibility page
  };

  const redirects = [internetExplorerRedirect];

  return redirects;
};

export default redirects;
