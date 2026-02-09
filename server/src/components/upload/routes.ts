// import { Hono } from "hono";
// import { authenticateJWT } from "../../middleware/authenticateJWT.ts";

// const router = new Hono();

// /**
//  * Upload image endpoint
//  * POST /api/v1/upload/image
//  * Requires authentication
//  */
// router.post("/image", authenticateJWT, async (c) => {
//   c.header("Cache-Control", "no-store");
//   try {
//     // Lazy-load AWS SDK to improve cold-start performance
//     const { PutObjectCommand } = await import("@aws-sdk/client-s3");
//     const { R2 } = await import("../../services/r2.ts");

//     const body = await c.req.parseBody();
//     const file = body.file as File;

//     if (!file) {
//       return c.json({ error: "No file provided" }, 400);
//     }

//     // Validate file type
//     const allowedTypes = [
//       "image/jpeg",
//       "image/jpg",
//       "image/png",
//       "image/webp",
//       "image/gif",
//     ];
//     if (!allowedTypes.includes(file.type)) {
//       return c.json(
//         {
//           error:
//             "Invalid file type. Only images (JPEG, PNG, WebP, GIF) are allowed.",
//         },
//         400,
//       );
//     }

//     // Validate file size (max 10MB)
//     const maxSize = 10 * 1024 * 1024; // 10MB
//     if (file.size > maxSize) {
//       return c.json({ error: "File size exceeds 10MB limit" }, 400);
//     }

//     // Convert File to Buffer
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // Generate unique filename
//     const timestamp = Date.now();
//     const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
//     const key = `blog-images/${timestamp}-${sanitizedName}`;

//     // Upload to Cloudflare R2
//     const command = new PutObjectCommand({
//       Bucket: process.env.CLOUDFLARE_BUCKET!,
//       Key: key,
//       Body: buffer,
//       ContentType: file.type,
//     });

//     await R2.send(command);

//     // Construct public URL
//     // If you have a custom domain, use that instead
//     const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
//     const bucket = process.env.CLOUDFLARE_BUCKET;
//     const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL
//       ? `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${key}`
//       : `https://pub-${accountId}.r2.dev/${key}`;

//     return c.json(
//       {
//         url: publicUrl,
//         message: "Image uploaded successfully",
//       },
//       200,
//     );
//   } catch (error) {
//     console.error("Upload error:", error);
//     return c.json({ error: "Failed to upload image" }, 500);
//   }
// });

// export default router;
