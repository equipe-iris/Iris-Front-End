import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FrequentTermsData } from "@/types/types";

const frequentTermsMock: FrequentTermsData[] = [
    { term: "login", count: 25 },
    { term: "erro", count: 18 },
    { term: "senha", count: 15 },
    { term: "acesso", count: 12 },
    { term: "sistema", count: 10 },
]

export default function FrequentTermsCard() {
    return (
        <Card className="col-span-1 row-span-6 flex flex-col gap-10 p-6">
            <CardHeader className="px-0">
                <CardTitle>Termos mais frequentes</CardTitle>
                <CardDescription>Palavras-chave que aparecem com frequência nos chamados.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="min-w-full flex justify-between p-2 text-sm font-semibold">
                    <span>Termo</span>
                    <span>Quantidade</span>
                </div>
                {frequentTermsMock.map(({ term, count }) => (
                    <div key={term} className="min-w-full flex justify-between px-2 py-4 font- text-zinc-700 border-t border-zinc-200">
                        <span>{term}</span>
                        <span>{count}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}