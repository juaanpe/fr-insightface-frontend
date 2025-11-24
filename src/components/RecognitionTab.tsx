import React, { useState } from 'react';
import { registerFace, recognizeFace } from '../api';
import WebcamCapture from './WebcamCapture';
import { UserPlus, ScanFace, Upload, Camera, Loader2, UserCheck, AlertTriangle } from 'lucide-react';

const RecognitionTab: React.FC = () => {
    const [regFile, setRegFile] = useState<File | null>(null);
    const [regName, setRegName] = useState('');
    const [recFile, setRecFile] = useState<File | null>(null);
    const [recResult, setRecResult] = useState<{ name: string; score: number } | null>(null);
    const [loadingReg, setLoadingReg] = useState(false);
    const [loadingRec, setLoadingRec] = useState(false);

    const [showRegWebcam, setShowRegWebcam] = useState(false);
    const [showRecWebcam, setShowRecWebcam] = useState(false);

    const handleRegister = async () => {
        if (!regFile || !regName) return;
        setLoadingReg(true);
        try {
            await registerFace(regFile, regName);
            alert('User registered successfully!');
            setRegFile(null);
            setRegName('');
            setShowRegWebcam(false);
        } catch (error: any) {
            console.error(error);
            alert(error.response?.data?.detail || 'Error registering user');
        } finally {
            setLoadingReg(false);
        }
    };

    const handleRecognize = async () => {
        if (!recFile) return;
        setLoadingRec(true);
        try {
            const data = await recognizeFace(recFile);
            setRecResult(data);
        } catch (error: any) {
            console.error(error);
            alert(error.response?.data?.detail || 'Error recognizing user');
        } finally {
            setLoadingRec(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Register Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                <div className="bg-neutral-50 p-6 border-b border-neutral-200">
                    <div className="flex items-center gap-3 text-primary-700">
                        <UserPlus size={24} />
                        <h3 className="text-xl font-bold text-neutral-900">Register Identity</h3>
                    </div>
                    <p className="text-sm text-neutral-500 mt-1">Add a new person to the database.</p>
                </div>

                <div className="p-6 flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                            placeholder="e.g. John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">Face Photo</label>
                        {!showRegWebcam ? (
                            <div className="border-2 border-dashed border-neutral-300 rounded-xl p-6 text-center hover:border-primary-400 hover:bg-neutral-50 transition relative">
                                <input type="file" onChange={(e) => setRegFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                {regFile ? (
                                    <div className="flex items-center gap-3 justify-center">
                                        <img src={URL.createObjectURL(regFile)} className="w-12 h-12 rounded-full object-cover" alt="Preview" />
                                        <span className="text-sm font-medium text-primary-700 truncate max-w-[150px]">{regFile.name}</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-neutral-400">
                                        <Upload size={24} />
                                        <span className="text-sm">Upload Photo</span>
                                    </div>
                                )}

                                <div className="my-3 text-xs text-neutral-400 font-medium uppercase tracking-wider">OR</div>

                                <button
                                    onClick={(e) => { e.preventDefault(); setShowRegWebcam(true); }}
                                    className="relative z-10 flex items-center justify-center gap-2 w-full py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 font-medium text-sm transition"
                                >
                                    <Camera size={16} /> Use Camera
                                </button>
                            </div>
                        ) : (
                            <WebcamCapture
                                onCapture={(file) => { setRegFile(file); setShowRegWebcam(false); }}
                                onCancel={() => setShowRegWebcam(false)}
                            />
                        )}
                    </div>

                    <button
                        onClick={handleRegister}
                        disabled={!regFile || !regName || loadingReg}
                        className="mt-2 w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 transition shadow-sm flex justify-center items-center gap-2"
                    >
                        {loadingReg ? <Loader2 className="animate-spin" size={20} /> : <UserPlus size={20} />}
                        {loadingReg ? 'Registering...' : 'Register Person'}
                    </button>
                </div>
            </div>

            {/* Recognize Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden flex flex-col">
                <div className="bg-neutral-50 p-6 border-b border-neutral-200">
                    <div className="flex items-center gap-3 text-primary-700">
                        <ScanFace size={24} />
                        <h3 className="text-xl font-bold text-neutral-900">Identify Person</h3>
                    </div>
                    <p className="text-sm text-neutral-500 mt-1">Scan a face to find a match.</p>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                    <div className="flex-grow flex flex-col justify-center">
                        {!showRecWebcam ? (
                            <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:bg-neutral-50 transition relative min-h-[300px] flex flex-col items-center justify-center">
                                <input type="file" onChange={(e) => setRecFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />

                                {recFile ? (
                                    <img src={URL.createObjectURL(recFile)} alt="Preview" className="max-h-64 rounded-lg shadow-sm" />
                                ) : (
                                    <>
                                        <div className="bg-primary-50 p-4 rounded-full mb-4 text-primary-600">
                                            <ScanFace size={48} />
                                        </div>
                                        <h4 className="text-lg font-semibold text-neutral-700">Drop image to scan</h4>
                                        <p className="text-sm text-neutral-400 mt-1 mb-6">or click to browse</p>

                                        <button
                                            onClick={(e) => { e.preventDefault(); setShowRecWebcam(true); }}
                                            className="relative z-20 flex items-center gap-2 px-6 py-2 bg-neutral-800 text-white rounded-full hover:bg-neutral-900 transition shadow-md"
                                        >
                                            <Camera size={18} /> Open Camera
                                        </button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <WebcamCapture
                                onCapture={(file) => { setRecFile(file); setShowRecWebcam(false); }}
                                onCancel={() => setShowRecWebcam(false)}
                            />
                        )}
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleRecognize}
                            disabled={!recFile || loadingRec}
                            className="w-full bg-neutral-900 text-white py-3 rounded-xl font-semibold hover:bg-black disabled:opacity-50 transition shadow-sm flex justify-center items-center gap-2"
                        >
                            {loadingRec ? <Loader2 className="animate-spin" size={20} /> : <ScanFace size={20} />}
                            {loadingRec ? 'Scanning Database...' : 'Identify Face'}
                        </button>
                    </div>

                    {recResult && (
                        <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200 animate-in fade-in slide-in-from-bottom-2">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full ${recResult.score > 0.5 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {recResult.score > 0.5 ? <UserCheck size={24} /> : <AlertTriangle size={24} />}
                                </div>
                                <div>
                                    <div className="text-xs text-neutral-500 uppercase font-bold tracking-wider">Identification Result</div>
                                    <div className="text-xl font-bold text-neutral-900">{recResult.name}</div>
                                    <div className="text-sm text-neutral-500">Confidence: {(recResult.score * 100).toFixed(1)}%</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecognitionTab;
