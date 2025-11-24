import React, { useState } from 'react';
import { compareFaces } from '../api';
import { Upload, ArrowRight, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const CompareTab: React.FC = () => {
    const [file1, setFile1] = useState<File | null>(null);
    const [file2, setFile2] = useState<File | null>(null);
    const [result, setResult] = useState<{ score: number; is_match: boolean } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleCompare = async () => {
        if (!file1 || !file2) return;
        setLoading(true);
        try {
            const data = await compareFaces(file1, file2);
            setResult(data);
        } catch (error) {
            console.error(error);
            alert('Error comparing faces');
        } finally {
            setLoading(false);
        }
    };

    const ImageUpload = ({ file, setFile, label }: { file: File | null, setFile: (f: File | null) => void, label: string }) => (
        <div className="flex-1">
            <label className="block text-sm font-semibold text-neutral-700 mb-2">{label}</label>
            <div className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all h-80 flex flex-col items-center justify-center
        ${file ? 'border-primary-200 bg-primary-50/30' : 'border-neutral-300 hover:border-primary-400 hover:bg-neutral-50'}
      `}>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {file ? (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        <img src={URL.createObjectURL(file)} alt="Preview" className="max-h-64 rounded-lg shadow-sm object-contain" />
                        <p className="mt-2 text-xs text-primary-700 font-medium truncate max-w-[200px]">{file.name}</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-neutral-400">
                        <div className="bg-neutral-100 p-4 rounded-full mb-3">
                            <Upload size={32} />
                        </div>
                        <p className="text-sm font-medium text-neutral-600">Click or drag to upload</p>
                        <p className="text-xs text-neutral-400 mt-1">JPG, PNG supported</p>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-neutral-900">Face Comparison</h2>
                <p className="text-neutral-500 mt-2">Upload two images to verify if they belong to the same person.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <ImageUpload file={file1} setFile={setFile1} label="Reference Image" />

                    <div className="hidden md:flex flex-col items-center justify-center text-neutral-300 pt-8">
                        <ArrowRight size={32} />
                    </div>

                    <ImageUpload file={file2} setFile={setFile2} label="Comparison Image" />
                </div>

                <div className="mt-10 flex justify-center">
                    <button
                        onClick={handleCompare}
                        disabled={!file1 || !file2 || loading}
                        className="flex items-center justify-center gap-2 bg-primary-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform active:scale-95 min-w-[160px]"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : null}
                        <span>{loading ? 'Analyzing...' : 'Compare'}</span>
                    </button>
                </div>

                {result && (
                    <div className={`mt-8 p-6 rounded-xl border flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500
            ${result.is_match ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}
          `}>
                        <div className={`p-3 rounded-full ${result.is_match ? 'bg-green-100' : 'bg-red-100'}`}>
                            {result.is_match ? <CheckCircle size={32} /> : <XCircle size={32} />}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">{result.is_match ? 'Match Confirmed' : 'No Match Detected'}</h3>
                            <p className="text-sm opacity-80 mt-1">
                                Similarity Score: <span className="font-mono font-bold">{(result.score * 100).toFixed(2)}%</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompareTab;
