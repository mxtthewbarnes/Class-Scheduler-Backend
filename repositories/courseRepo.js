// code/backend/repositories/courseRepo.js
const db = require("../config/db");

class CourseRepository {
  async getAll() {
    const result = await db.query(
      `SELECT id, code, title, instructor, start_time, end_time, days
       FROM courses
       ORDER BY id`
    );
    return result.rows;
  }

  async getById(id) {
    const result = await db.query(
      `SELECT id, code, title, instructor, start_time, end_time, days
       FROM courses
       WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  /**
   * Search
   *  - q: global search on code/title/instructor
   *  - name: matches code OR title
   *  - professor: matches instructor
   *  If q is provided, name/professor are ignored.
   */
  async search({ q = "", name = "", professor = "" }) {
    const where = [];
    const values = [];
    let i = 1;

    const trim = (s) => (typeof s === "string" ? s.trim() : "");

    const qVal = trim(q);
    const nameVal = trim(name);
    const profVal = trim(professor);

    if (qVal) {
      where.push(
        `(code ILIKE '%' || $${i} || '%' OR title ILIKE '%' || $${i} || '%' OR instructor ILIKE '%' || $${i} || '%')`
      );
      values.push(qVal);
    } else {
      if (nameVal) {
        where.push(
          `(code ILIKE '%' || $${i} || '%' OR title ILIKE '%' || $${i} || '%')`
        );
        values.push(nameVal);
        i++;
      }
      if (profVal) {
        where.push(`instructor ILIKE '%' || $${i} || '%'`);
        values.push(profVal);
        i++;
      }
    }

    if (!where.length) return [];

    const sql = `
      SELECT id, code, title, instructor, start_time, end_time, days
      FROM courses
      WHERE ${where.join(" AND ")}
      ORDER BY code ASC
      LIMIT 200;
    `;

    const result = await db.query(sql, values);
    return result.rows;
  }
}

module.exports = new CourseRepository();
