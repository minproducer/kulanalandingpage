import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../services/apiService';

interface ImageUploadFieldProps {
    label: string;
    value: string;
    onChange: (url: string) => void;
    disabled?: boolean;
    description?: string;
    className?: string;
    translations?: {
        imageUrl?: string;
        uploadFile?: string;
        enterUrl?: string;
        urlPlaceholder?: string;
        uploadHint?: string;
        uploading?: string;
        preview?: string;
        imageError?: string;
        uploadFailed?: string;
        tryAgain?: string;
    };
}

type UploadMethod = 'upload' | 'url';

const ImageUploadField = ({ 
    label, 
    value, 
    onChange, 
    disabled = false,
    description,
    className = '',
    translations = {}
}: ImageUploadFieldProps) => {
    const [method, setMethod] = useState<UploadMethod>('url');
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [urlInput, setUrlInput] = useState(value);

    // Default translations
    const t = {
        imageUrl: translations.imageUrl || 'Image URL',
        uploadFile: translations.uploadFile || 'Upload File',
        enterUrl: translations.enterUrl || 'Enter the full URL of the image (must start with http:// or https://)',
        urlPlaceholder: translations.urlPlaceholder || 'https://example.com/image.jpg',
        uploadHint: translations.uploadHint || 'Upload an image file from your computer (max 5MB)',
        uploading: translations.uploading || 'Uploading...',
        preview: translations.preview || 'Preview:',
        imageError: translations.imageError || 'Image Error',
        uploadFailed: translations.uploadFailed || 'Upload failed',
        tryAgain: translations.tryAgain || 'Please try again'
    };

    useEffect(() => {
        setUrlInput(value);
    }, [value]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        console.log('🖼️ Starting image upload:', file.name, file.type, file.size);

        try {
            setUploading(true);
            setUploadProgress(0);

            const reader = new FileReader();
            reader.onloadend = () => {
                console.log('✅ Preview loaded (base64)');
                onChange(reader.result as string);
            };
            reader.readAsDataURL(file);

            const formDataUpload = new FormData();
            formDataUpload.append('image', file);

            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const percentComplete = (e.loaded / e.total) * 100;
                    console.log('📊 Upload progress:', Math.round(percentComplete) + '%');
                    setUploadProgress(Math.round(percentComplete));
                }
            });

            const uploadPromise = new Promise<{ success: boolean; data?: { url: string }; message?: string }>((resolve, reject) => {
                xhr.addEventListener('load', () => {
                    console.log('📥 Server response status:', xhr.status);
                    console.log('📥 Server response:', xhr.responseText);
                    if (xhr.status === 200) {
                        try {
                            const result = JSON.parse(xhr.responseText);
                            resolve(result);
                        } catch (err) {
                            console.error('❌ Failed to parse JSON:', err);
                            reject(new Error('Failed to parse response'));
                        }
                    } else {
                        reject(new Error(`Upload failed with status ${xhr.status}`));
                    }
                });

                xhr.addEventListener('error', () => {
                    console.error('❌ Network error during upload');
                    reject(new Error('Network error during upload'));
                });

                xhr.addEventListener('abort', () => {
                    console.error('❌ Upload cancelled');
                    reject(new Error('Upload cancelled'));
                });
            });

            const token = localStorage.getItem('adminToken');
            
            xhr.open('POST', API_ENDPOINTS.UPLOAD_IMAGE);
            if (token) {
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            }
            xhr.send(formDataUpload);

            const result = await uploadPromise;
            console.log('🎉 Upload result:', result);

            if (result.success && result.data?.url) {
                console.log('✅ Upload successful! Server URL:', result.data.url);
                onChange(result.data.url);
                setUrlInput(result.data.url);
            } else {
                console.error('❌ Upload failed:', result.message);
                alert(`${t.uploadFailed}: ${result.message || 'Unknown error'}`);
                onChange('');
            }
        } catch (error) {
            console.error('❌ Upload error:', error);
            alert(`${t.uploadFailed}. ${t.tryAgain}.`);
            onChange('');
        } finally {
            setUploading(false);
            console.log('🏁 Upload process finished');
            setTimeout(() => setUploadProgress(0), 2000);
            e.target.value = '';
        }
    };

    const handleUrlChange = (url: string) => {
        setUrlInput(url);
        onChange(url);
    };

    return (
        <div className={className}>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {label}
            </label>
            {description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{description}</p>
            )}

            <div className="flex gap-2 mb-4">
                <button
                    type="button"
                    onClick={() => setMethod('url')}
                    disabled={disabled}
                    className={`flex-1 px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                        method === 'url'
                            ? 'bg-blue-600 text-white dark:bg-blue-500'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    {t.imageUrl}
                </button>
                <button
                    type="button"
                    onClick={() => setMethod('upload')}
                    disabled={disabled}
                    className={`flex-1 px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                        method === 'upload'
                            ? 'bg-green-600 text-white dark:bg-green-500'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {t.uploadFile}
                </button>
            </div>

            {method === 'url' && (
                <div>
                    <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => handleUrlChange(e.target.value)}
                        disabled={disabled}
                        className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder={t.urlPlaceholder}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {t.enterUrl}
                    </p>
                </div>
            )}

            {method === 'upload' && (
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={disabled || uploading}
                        className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:file:bg-green-900 dark:file:text-green-300 dark:hover:file:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {uploading && (
                        <div className="mt-3">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-green-700 dark:text-green-400">{t.uploading}</span>
                                <span className="text-sm font-medium text-green-700 dark:text-green-400">{uploadProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                                <div 
                                    className="bg-green-600 dark:bg-green-500 h-2.5 rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {t.uploadHint}
                    </p>
                </div>
            )}

            {value && (
                <div className="mt-4">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">{t.preview}</p>
                    <div className="relative inline-block w-full sm:w-auto">
                        <img
                            src={value}
                            alt="Preview"
                            className="w-full sm:max-w-full h-24 sm:h-32 object-contain rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                            onError={(e) => {
                                e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3E${encodeURIComponent(t.imageError)}%3C/text%3E%3C/svg%3E`;
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                onChange('');
                                setUrlInput('');
                            }}
                            disabled={disabled}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 sm:p-1 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUploadField;
