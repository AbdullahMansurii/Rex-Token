import { useState } from "react";
import { Upload, CheckCircle, User, CreditCard, Building, Flag, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

const KYC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        aadharNumber: "",
        panNumber: "",
        bankAccountHolder: "",
        bankAccountNumber: "",
        bankName: "",
        ifscCode: ""
    });

    // File State
    const [files, setFiles] = useState({
        profilePhoto: null,
        aadharFront: null,
        aadharBack: null,
        panImage: null
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e, field) => {
        if (e.target.files && e.target.files[0]) {
            setFiles({ ...files, [field]: e.target.files[0] });
        }
    };

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
        else handleSubmit();
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError("");

        try {
            const data = new FormData();

            // Append Text Fields
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });

            // Append Files
            Object.keys(files).forEach(key => {
                if (files[key]) {
                    data.append(key, files[key]);
                }
            });

            const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;

            const response = await fetch(`${API_BASE_URL}/api/kyc`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(true);
            } else {
                setError(result.message || "Failed to submit KYC");
            }
        } catch (err) {
            setError("Network Error: Could not submit KYC");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="max-w-2xl mx-auto mt-20 text-center">
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-12">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                        <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Submission Successful!</h2>
                    <p className="text-gray-400 mb-8">
                        Your KYC documents have been submitted securely. Our team will review your application within 24-48 hours.
                        You will receive an update once the verification is complete.
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-primary hover:bg-primary-glow text-white font-bold py-3 px-8 rounded-xl transition shadow-glow"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const StepIndicator = () => (
        <div className="flex items-center justify-between max-w-3xl mx-auto mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10"></div>
            {[1, 2, 3, 4].map((item) => (
                <div key={item} className={`relative flex flex-col items-center gap-2 bg-background px-2`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= item ? 'bg-primary text-white shadow-glow' : 'bg-surface border border-white/10 text-gray-500'
                        }`}>
                        {item}
                    </div>
                    <span className={`text-xs font-medium absolute -bottom-6 w-32 text-center transition-colors duration-300 ${step >= item ? 'text-white' : 'text-gray-600'
                        }`}>
                        {item === 1 && "Profile Photo"}
                        {item === 2 && "Aadhar Details"}
                        {item === 3 && "PAN Details"}
                        {item === 4 && "Bank Details"}
                    </span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">KYC Verification</h1>
                <p className="text-gray-400">Complete your identity verification to unlock all features</p>
            </div>

            <StepIndicator />

            <div className="bg-surface border border-white/5 rounded-2xl p-8 min-h-[500px] flex flex-col justify-between">
                <div>
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center">
                            {error}
                        </div>
                    )}

                    {/* Step 1: Profile Photo */}
                    {step === 1 && (
                        <div className="text-center py-10">
                            <h2 className="text-xl font-bold text-purple-400 mb-8">Profile Photo</h2>

                            <div className="relative group cursor-pointer inline-block mb-8">
                                <div className="w-48 h-48 rounded-full border-2 border-dashed border-white/20 flex flex-col items-center justify-center bg-black/40 group-hover:border-primary/50 transition relative overflow-hidden">
                                    {files.profilePhoto ? (
                                        <img src={URL.createObjectURL(files.profilePhoto)} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <User className="w-16 h-16 text-gray-600 mb-2" />
                                            <span className="text-gray-500 text-sm">No photo</span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(e, 'profilePhoto')}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                    />
                                </div>
                            </div>
                            <p className="text-gray-500 text-xs mt-6">
                                Please upload a clear, recent photo of yourself<br />
                                Max file size: 5MB | Supported formats: JPG, PNG
                            </p>
                        </div>
                    )}

                    {/* Step 2: Aadhar Details */}
                    {step === 2 && (
                        <div className="max-w-xl mx-auto space-y-6">
                            <h2 className="text-xl font-bold text-purple-400 mb-6 text-center">Aadhar Verification</h2>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-white">Aadhar Number</label>
                                <input
                                    type="text"
                                    name="aadharNumber"
                                    value={formData.aadharNumber}
                                    onChange={handleInputChange}
                                    placeholder="XXXX XXXX XXXX"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-white">Front Side</label>
                                    <div className="h-32 bg-black/40 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-primary/50 transition relative overflow-hidden">
                                        {files.aadharFront ? (
                                            <img src={URL.createObjectURL(files.aadharFront)} alt="Front" className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <Upload className="w-6 h-6 mb-2" />
                                                <span className="text-xs">Upload Front</span>
                                            </>
                                        )}
                                        <input type="file" onChange={(e) => handleFileChange(e, 'aadharFront')} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-white">Back Side</label>
                                    <div className="h-32 bg-black/40 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-primary/50 transition relative overflow-hidden">
                                        {files.aadharBack ? (
                                            <img src={URL.createObjectURL(files.aadharBack)} alt="Back" className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <Upload className="w-6 h-6 mb-2" />
                                                <span className="text-xs">Upload Back</span>
                                            </>
                                        )}
                                        <input type="file" onChange={(e) => handleFileChange(e, 'aadharBack')} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: PAN Details */}
                    {step === 3 && (
                        <div className="max-w-xl mx-auto space-y-6">
                            <h2 className="text-xl font-bold text-purple-400 mb-6 text-center">PAN Verification</h2>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-white">PAN Number</label>
                                <input
                                    type="text"
                                    name="panNumber"
                                    value={formData.panNumber}
                                    onChange={handleInputChange}
                                    placeholder="ABCDE1234F"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-white">PAN Card Image</label>
                                <div className="h-40 bg-black/40 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-primary/50 transition relative overflow-hidden">
                                    {files.panImage ? (
                                        <img src={URL.createObjectURL(files.panImage)} alt="PAN" className="w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <CreditCard className="w-8 h-8 mb-3 text-gray-600" />
                                            <span className="text-sm">Click to upload PAN Card</span>
                                        </>
                                    )}
                                    <input type="file" onChange={(e) => handleFileChange(e, 'panImage')} className="absolute inset-0 opacity-0 cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Bank Details */}
                    {step === 4 && (
                        <div className="max-w-xl mx-auto space-y-5">
                            <h2 className="text-xl font-bold text-purple-400 mb-6 text-center">Bank Account Details</h2>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-white">Account Holder Name</label>
                                <input
                                    type="text"
                                    name="bankAccountHolder"
                                    value={formData.bankAccountHolder}
                                    onChange={handleInputChange}
                                    placeholder="As per bank records"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-white">Account Number</label>
                                <input
                                    type="text"
                                    name="bankAccountNumber"
                                    value={formData.bankAccountNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter Account Number"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-white">Bank Name</label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="text"
                                            name="bankName"
                                            value={formData.bankName}
                                            onChange={handleInputChange}
                                            placeholder="Bank Name"
                                            className="w-full pl-10 bg-black/40 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-primary outline-none transition"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-white">IFSC Code</label>
                                    <div className="relative">
                                        <Flag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="text"
                                            name="ifscCode"
                                            value={formData.ifscCode}
                                            onChange={handleInputChange}
                                            placeholder="IFSC"
                                            className="w-full pl-10 bg-black/40 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-primary outline-none transition"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/5">
                    <button
                        onClick={handleBack}
                        disabled={step === 1}
                        className={`px-6 py-3 rounded-xl font-bold transition ${step === 1 ? 'opacity-0 cursor-default' : 'bg-white/5 text-white hover:bg-white/10'}`}
                    >
                        Back
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={isLoading}
                        className="w-full max-w-sm ml-auto bg-primary hover:bg-primary-glow text-white font-bold py-3 rounded-xl shadow-glow transition transform hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <>
                                {step === 4 ? "Submit KYC Verification" : "Next"}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KYC;
