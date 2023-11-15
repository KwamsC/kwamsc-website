import app from "../src/app";
import request from "supertest";
// import app   "../src/app";

describe("GET /api", () => {
    test("should return 200 OK", async () => {
        return await request(app).get("/api/posts")
            .expect(200);
    });

    test("should have post", async () => {
        const res = await request(app).get("/api/posts")
        console.log(res.body)
        expect(res.body[0]).toHaveProperty("title");
    });
});