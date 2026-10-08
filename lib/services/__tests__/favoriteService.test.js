jest.mock("../../repositories/favoriteRepository", () => ({
  findAllFavorites: jest.fn(),
  findFavoriteById: jest.fn(),
  insertFavorite: jest.fn(),
  deleteFavoriteById: jest.fn(),
}));

import { addFavorite, removeFavorite } from "@/lib/services/favoriteService";
import {
  findFavoriteById,
  insertFavorite,
  deleteFavoriteById,
} from "../../repositories/favoriteRepository";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("favoriteService", () => {
  test("addFavorite berhasil menyimpan data valid", async () => {
    findFavoriteById.mockResolvedValue(null);
    insertFavorite.mockResolvedValue({ id: 1, name: "Ayu" });

    const result = await addFavorite({ id: 1, name: "Ayu" });

    expect(result.success).toBe(true);
    expect(result.status).toBe(201);
    expect(insertFavorite).toHaveBeenCalledWith({ id: 1, name: "Ayu" });
  });

  test("addFavorite menolak data tanpa name", async () => {
    const result = await addFavorite({ id: 1 });

    expect(result.success).toBe(false);
    expect(result.status).toBe(400);
    expect(insertFavorite).not.toHaveBeenCalled();
  });

  test("addFavorite menolak id yang sudah ada", async () => {
    findFavoriteById.mockResolvedValue({ id: 1, name: "Ayu" });

    const result = await addFavorite({ id: 1, name: "Ayu Lagi" });

    expect(result.success).toBe(false);
    expect(result.status).toBe(400);
    expect(result.error).toBe("User ini sudah difavoritkan");
    expect(insertFavorite).not.toHaveBeenCalled();
  });

  test("removeFavorite berhasil menghapus data yang ada", async () => {
    deleteFavoriteById.mockResolvedValue(true);

    const result = await removeFavorite(1);

    expect(result.success).toBe(true);
    expect(result.status).toBe(200);
    expect(deleteFavoriteById).toHaveBeenCalledWith(1);
  });

  test("removeFavorite gagal kalau id tidak ditemukan", async () => {
    deleteFavoriteById.mockResolvedValue(false);

    const result = await removeFavorite(999);

    expect(result.success).toBe(false);
    expect(result.status).toBe(404);
  });
});