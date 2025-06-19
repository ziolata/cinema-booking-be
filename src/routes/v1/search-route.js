import express from "express";
import * as controller from "../../controllers/search-controller.js";

/**
 * @swagger
 * /api/v1/search/movie:
 *   get:
 *     tags:
 *       - Search
 *     summary: Tìm kiếm phim
 *     description: |
 *       ### Mô tả:
 *       API cho phép tìm kiếm phim theo từ khóa (keyword) và thể loại (genre name).
 *       <br/>
 *       Có thể truyền một hoặc cả hai tham số.
 *
 *       Tìm kiếm theo từ khóa sẽ hỗ trợ tìm gần đúng (không phân biệt hoa thường).
 *
 *       Nếu tìm theo thể loại, hệ thống sẽ kiểm tra tên thể loại có tồn tại hay không.
 *
 *       ### Hướng dẫn:
 *       Truyền tham số `keyword` và/hoặc `genreName` trên query string.
 *
 *       Ví dụ: `/api/v1/search/movie?keyword=batman&genreName=action`
 *
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         required: false
 *         description: Từ khóa tìm kiếm phim theo tên.
 *       - in: query
 *         name: genreName
 *         schema:
 *           type: string
 *         required: false
 *         description: Tên thể loại phim cần tìm.
 *     responses:
 *       200:
 *         description: Kết quả tìm kiếm phim.
 *
 *       404:
 *         description: Không tìm thấy bộ phim nào phù hợp với từ khóa tìm kiếm!.
 */

const router = express.Router();

router.get("/movie", controller.moviesSearchController);

export default router;
