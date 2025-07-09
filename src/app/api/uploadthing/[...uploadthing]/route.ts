import { createUploadthing, type FileRouter } from "uploadthing/next";
import { createRouteHandler } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter: FileRouter = {
  productImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }),
};

export const { GET, POST } = createRouteHandler({
  router: uploadRouter,
  config: {
    uploadthingSecret: "sk_live_7e276cea24bb8f26d4803e9e0f738bee5efaff401d83e3079c2c6a4d36f7600f",
  },
});
