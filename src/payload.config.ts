import { postgresAdapter } from "@payloadcms/db-postgres";
import { uploadthingStorage } from "@payloadcms/storage-uploadthing";
import path from "path";
import { buildConfig, PayloadRequest } from "payload";
import sharp from "sharp"; // sharp-import
import { fileURLToPath } from "url";

import { defaultLexical } from "@/fields/defaultLexical";

import { Categories } from "./collections/Categories";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Users } from "./collections/Users";
import { Footer } from "./Footer/config";
import { Header } from "./Header/config";
import { plugins } from "./plugins";
import { getServerSideURL } from "./utilities/getURL";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      beforeLogin: ["@/components/BeforeLogin"],
      graphics: {
        Icon: "@/components/EmptyDiv/EmptyDiv",
        Logo: "@/components/EmptyDiv/EmptyDiv",
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          height: 667,
          label: "Mobile",
          name: "mobile",
          width: 375,
        },
        {
          height: 1024,
          label: "Tablet",
          name: "tablet",
          width: 768,
        },
        {
          height: 900,
          label: "Desktop",
          name: "desktop",
          width: 1440,
        },
      ],
    },
    user: Users.slug,
  },

  collections: [Pages, Posts, Media, Categories, Users],

  cors: [getServerSideURL()].filter(Boolean),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  globals: [Header, Footer],
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true;

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        // const authHeader = req.headers.get('authorization')
        // return authHeader === `Bearer ${process.env.CRON_SECRET}`
        return false;
      },
    },
    tasks: [],
  },
  plugins: [
    ...plugins,
    ...(process.env.UPLOADTHING_TOKEN
      ? [
          uploadthingStorage({
            collections: {
              media: true,
            },
            options: {
              acl: "public-read",
              token: process.env.UPLOADTHING_TOKEN,
            },
          }),
        ]
      : []),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
