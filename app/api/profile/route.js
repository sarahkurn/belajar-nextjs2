export async function GET() {
    const profile = {
        name : "Sarah Kurniasih",
        role : "Peserta bootcamp",
        favoriteTech : ["JavaScript", "React", "Next.js"],
    };

    return Response.json(profile);
}