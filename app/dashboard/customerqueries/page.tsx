"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";

type Query = {
  id: number;
  user_id: string;
  question: string;
  answer: string | null;
  created_at: string;
};

export default function SupportPage() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [answerText, setAnswerText] = useState("");

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("customer_support")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Use setTimeout to avoid synchronous state update in effect
      setTimeout(() => {
        setQueries(data as Query[]);
        setLoading(false);
      }, 0);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const submitAnswer = async (id: number) => {
    if (!answerText.trim()) return;

    setLoading(true);
    const { error } = await supabase
      .from("customer_support")
      .update({ answer: answerText.trim() })
      .eq("id", id);

    if (error) {
      console.error(error);
    } else {
      setEditingId(null);
      setAnswerText("");
      fetchQueries();
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-[#fcf6e8] min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-[#7c5a14]">
        🌾 किसान सहायता डैशबोर्ड
      </h1>

      {loading ? (
        <p className="text-[#4a3b15] text-lg">लोड हो रहा है...</p>
      ) : queries.length === 0 ? (
        <Alert className="bg-[#fff4d6] text-[#7c5a14] border-[#f2e7c8]">
          <AlertTitle>कोई प्रश्न नहीं मिला</AlertTitle>
          उपयोगकर्ताओं ने अभी तक कोई प्रश्न नहीं पूछा है।
        </Alert>
      ) : (
        <div className="overflow-x-auto">
          <Table className="bg-[#fff7d6] border-[#f2e7c8] rounded-lg shadow-md">
            <TableHeader>
              <TableRow className="bg-[#f2e7c8]">
                <TableHead className="text-[#4a3b15] text-lg font-semibold">
                  प्रश्न
                </TableHead>
                <TableHead className="text-[#4a3b15] text-lg font-semibold">
                  उत्तर
                </TableHead>
                <TableHead className="text-[#4a3b15] text-lg font-semibold">
                  क्रियाएँ
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queries.map((q) => (
                <TableRow key={q.id} className="border-b border-[#f2e7c8]">
                  <TableCell className="text-[#4a3b15] text-base">
                    {q.question}
                  </TableCell>
                  <TableCell>
                    {editingId === q.id ? (
                      <Textarea
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        placeholder="उत्तर यहाँ लिखें..."
                        className="w-full bg-[#fff5cc] text-[#4a3b15]"
                      />
                    ) : (
                      <span className="text-[#2f7a2f]">
                        {q.answer || "प्रतीक्षारत"}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    {editingId === q.id ? (
                      <>
                        <Button
                          onClick={() => submitAnswer(q.id)}
                          className="bg-[#8a6122] text-white"
                        >
                          सेव
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setEditingId(null)}
                        >
                          रद्द करें
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => {
                          setEditingId(q.id);
                          setAnswerText(q.answer || "");
                        }}
                        className="bg-[#9350c7] text-white"
                      >
                        उत्तर दें
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
