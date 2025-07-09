import { createUploadthing, type FileRouter } from "uploadthing/next";
import { createRouteHandler }    from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter: FileRouter = {
  productImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }),
};

export const { GET, POST } = createRouteHandler({
  router: uploadRouter,
});
