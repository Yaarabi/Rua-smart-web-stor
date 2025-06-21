

const getRespense = async (prompt: string): Promise<string | null> => {
    try {
        const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: {
            "Content-Type": "application/json",
        },
        });

        const data = await res.json();

        console.log("AI response JSON:", data);

        return data.result || null;
    } catch (error) {
        console.error("Fetch or parse error:", error);
        return null;
    }
};

export default getRespense;
