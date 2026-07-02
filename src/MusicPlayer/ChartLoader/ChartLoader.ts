import { NotesData } from "../ChartData";
import IChartLoader from "./IChartLoader";

export default class ChartLoader implements IChartLoader {
    public async load(path: string): Promise<NotesData[]> {
        // ファイルをfetchで取得し、テキストとして読み込む
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to load chart file: ${path}`);
        }
        const text = await response.text();

        const notes: NotesData[] = [];

        // 改行で分割して1行ずつ処理
        const lines = text.split("\n");

        for (const line of lines) {
            // 前後の空白を削除し、空行の場合はスキップ
            const trimmedLine = line.trim();
            if (trimmedLine.length === 0) continue;

            // 空白文字（スペースやタブなど）で分割
            const parts = trimmedLine.split(/\s+/);

            // フォーマット通りか確認（最低3つの要素があり、2つ目が"Note"であること）
            if (parts.length >= 3 && parts[1] === "Note") {
                const timing = parseFloat(parts[0]);
                const bar = parseFloat(parts[2]);

                // speedは存在すれば数値に変換、なければ undefined (NotesData側で1になる)
                const speed =
                    parts.length >= 4 ? parseFloat(parts[3]) : undefined;

                // NaN (Not a Number) になっていないか簡易的なチェック
                if (!isNaN(timing) && !isNaN(bar)) {
                    notes.push(new NotesData(timing, bar, speed));
                }
            }
        }

        return notes;
    }
}
