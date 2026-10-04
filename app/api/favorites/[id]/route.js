import { favorites } from "@/lib/db";

export async function DELETE(request, { params }) {
  const { id } = await params;
  const index = favorites.findIndex((f) => String(f.id) === id);

  if (index === -1) {
    return Response.json({ error: "Data tidak ditemukan" }, { status: 404 });
  }

  favorites.splice(index, 1);
  return Response.json({ message: "Berhasil dihapus" });
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();

  if (!body || Object.keys(body).length === 0) {
    return Response.json(
      { error: "Body tidak boleh kosong" },
      { status: 400 }
    );
  }

  const index = favorites.findIndex((f) => String(f.id) === id);

  if (index === -1) {
    return Response.json({ error: "Data tidak ditemukan" }, { status: 404 });
  }

  favorites[index] = {
    ...favorites[index],
    ...body,
  };

  return Response.json(favorites[index]);
}