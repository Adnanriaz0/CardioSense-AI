// DoctorProfile.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Card from './Card'; // Assuming Card component exists
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

/**
 * DoctorProfile Component: Allows the doctor to view and edit their profile information.
 * @param {object} props - Component props.
 * @param {object} props.themeColors - Theme-specific colors (e.g., { primary: '...', secondary: '...', textColorClass: 'text-gray-900', cardBgClass: 'bg-white', buttonPrimaryClass: 'bg-blue-600 text-white', shadowClass: 'shadow-lg' }).
 * @param {object} props.doctorData - Current doctor profile data.
 * @param {function} props.onProfileUpdate - Callback to update doctor profile data.
 */
const DoctorProfile = ({ themeColors, doctorData, onProfileUpdate }) => {
    const { t } = useTranslation();

    // State variables
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');
    const [phone, setPhone] = useState('');
    // [REMOVED] const [address, setAddress] = useState('');
    // [REMOVED] const [bio, setBio] = useState('');
    const [gender, setGender] = useState('male');
    const [dob, setDob] = useState('');
    const [education, setEducation] = useState([{ degree: '', institution: '', year: '' }]);
    const [experience, setExperience] = useState([{ title: '', hospital: '', years: '' }]);

    const [isSaving, setIsSaving] = useState(false);

    // Initial data load using useEffect
    useEffect(() => {
        const token = localStorage.getItem('token');
        const doctorId = doctorData?._id || localStorage.getItem('doctorId');

        const fetchProfile = async () => {
            if (!doctorId || !token) {
                toast.error(t('Authentication details missing. Please log in again.'));
                return;
            }
            try {
                const res = await axios.get(`/api/doctors/profile/${doctorId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const { user, profile } = res.data;

                const dataToSet = profile || {};

                setName(dataToSet.name || (user ? user.name : ''));
                setSpecialization(dataToSet.specialization || dataToSet.specialty || '');
                setEmail(dataToSet.email || (user ? user.email : ''));
                setProfilePic(dataToSet.profilePic || 'https://via.placeholder.com/150');
                setPhone(dataToSet.phone || '');
                // [REMOVED] setAddress(dataToSet.address || '');
                // [REMOVED] setBio(dataToSet.bio || '');
                setGender(dataToSet.gender || 'male');
                setDob(dataToSet.dob ? dataToSet.dob.split('T')[0] : '');
                setEducation(dataToSet.education && dataToSet.education.length > 0 ? dataToSet.education : [{ degree: '', institution: '', year: '' }]);
                setExperience(dataToSet.experience && dataToSet.experience.length > 0 ? dataToSet.experience : [{ title: '', hospital: '', years: '' }]);

                toast.success(t('Doctor profile loaded successfully!'));

            } catch (err) {
                console.error("Failed to load doctor profile:", err.response ? err.response.data : err.message);
                const errorMessage = err.response?.data?.message || t('Failed to load doctor profile.');
                toast.error(errorMessage);
                if (err.response?.status === 200 && err.response?.data?.message.includes('Doctor profile data abhi maujood nahi hai')) {
                    setName(doctorData?.name || '');
                    setSpecialization('');
                    setEmail(doctorData?.email || '');
                    setProfilePic('https://via.placeholder.com/150');
                    setPhone('');
                    // [REMOVED] setAddress('');
                    // [REMOVED] setBio('');
                    setGender('male');
                    setDob('');
                    setEducation([{ degree: '', institution: '', year: '' }]);
                    setExperience([{ title: '', hospital: '', years: '' }]);
                }
            }
        };

        if (doctorId && token && (!doctorData || Object.keys(doctorData).length === 0 || (!doctorData.name && !doctorData.specialization))) {
            fetchProfile();
        }
    }, [doctorData, t]);

    useEffect(() => {
        if (doctorData && Object.keys(doctorData).length > 0) {
            setName(doctorData.name || '');
            setSpecialization(doctorData.specialization || doctorData.specialty || '');
            setEmail(doctorData.email || '');
            setProfilePic(doctorData.profilePic || 'https://via.placeholder.com/150');
            setPhone(doctorData.phone || '');
            // [REMOVED] setAddress(doctorData.address || '');
            // [REMOVED] setBio(doctorData.bio || '');
            setGender(doctorData.gender || 'male');
            setDob(doctorData.dob ? doctorData.dob.split('T')[0] : '');
            setEducation(doctorData.education && doctorData.education.length > 0 ? doctorData.education : [{ degree: '', institution: '', year: '' }]);
            setExperience(doctorData.experience && doctorData.experience.length > 0 ? doctorData.experience : [{ title: '', hospital: '', years: '' }]);
        }
    }, [doctorData]);


    const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    // ✅ YEH LINEIN YAHAN PE HONGI:
    const token = localStorage.getItem('token');
    const doctorId = doctorData?._id || localStorage.getItem('doctorId');

    if (!doctorId || !token) {
        toast.error(t('Authentication details missing. Please log in again.'));
        setIsSaving(false);
        return;
    }

    try {
        const payload = {
            name,
            specialization,
            email,
            profilePic,
            phone,
            gender,
            dob,
            education: education.filter(e => e.degree || e.institution || e.year),
            experience: experience.filter(e => e.title || e.hospital || e.years),
        };

        const res = await axios.put(
            `/api/doctors/profile`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (onProfileUpdate) onProfileUpdate(res.data.doctor);
        toast.success(t('Profile saved successfully!'));
    } catch (error) {
        console.error("Profile update failed:", error);
        const errorMessage = error.response?.data?.message || t('Failed to save profile. Please try again.');
        toast.error(errorMessage);
    } finally {
        setIsSaving(false);
    }
};


    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleListChange = (setter, index, field, value) => {
        setter(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
    };

    const addListItem = (setter) => {
        setter(prev => [...prev, {}]);
    };

    const removeListItem = (setter, index) => {
        setter(prev => prev.filter((_, i) => i !== index));
    };

    // Modernized Tailwind CSS Classes
    const inputClasses = `mt-1 block w-full rounded-lg border border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-${themeColors.primary || 'blue'}-500 focus:ring-${themeColors.primary || 'blue'}-500 sm:text-base p-3 transition-all duration-300 focus:shadow-md focus:ring-opacity-50`;
    const labelClasses = `block text-sm font-medium ${themeColors.textColorClass} mb-1`;
    const subSectionTitleClasses = `text-xl font-bold ${themeColors.textColorClass} mb-4 border-b-2 pb-2 border-${themeColors.primary || 'blue'}-300/50`;

    // Updated listItemClasses for individual entries within Education/Experience
    const eduExpEntryClasses = `grid grid-cols-1 md:grid-cols-3 gap-4 items-end p-4 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg`;

    const addButtonClasses = `${themeColors.buttonPrimaryClass} px-6 py-2 rounded-full text-sm font-semibold transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-${themeColors.primary || 'blue'}-500 focus:ring-opacity-75`;
    const removeButtonClasses = `p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors transform hover:scale-110`;

    // Class for individual main sections like Personal Info, About/Combined
    const mainSectionBoxClasses = `space-y-6 p-8 rounded-xl ${themeColors.shadowClass} border border-gray-200 animate-fadeIn ${themeColors.cardBgClass}`;

    return (
        <Card title={t('Doctor Profile Management')} themeColors={themeColors} className={`col-span-full animate-fadeInUp ${themeColors.cardBgClass}`}>
            <Toaster position="top-center" reverseOrder={false} />
            <div className={`flex flex-col items-center mb-8 p-6 rounded-lg shadow-inner ${themeColors.cardBgClass}`}>
                <div className={`relative w-40 h-40 rounded-full overflow-hidden ${themeColors.shadowClass} border-4 border-${themeColors.primary || 'blue'}-500 transition-all duration-300 hover:scale-105`}>
                    <img src={profilePic} alt={t('Doctor Name')} className="w-full h-full object-cover" />
                    <label
                        htmlFor="profile-pic-upload"
                        className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer text-white text-sm font-medium"
                        title={t('Change Profile Picture')}
                    >
                        <svg className="w-10 h-10 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.808-1.212A2 2 0 0110.664 3h2.672a2 2 0 011.664.89l.808 1.212a2 2 0 001.664.89H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {t('Edit Photo')}
                    </label>
                    <input
                        type="file"
                        id="profile-pic-upload"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                        className="hidden"
                    />
                </div>
                <h2 className={`mt-5 text-3xl font-extrabold ${themeColors.textColorClass}`}>{name || t('Your Name')}</h2>
                <p className={`text-lg ${themeColors.textColorClass} opacity-80`}>{specialization || t('Your Specialty')}</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Personal Information Section */}
                <div className={mainSectionBoxClasses}>
                    <h3 className={subSectionTitleClasses}>{t('Personal Information')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                            <label htmlFor="name" className={labelClasses}>
                                {t('Full Name')}
                            </label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} placeholder={t('Enter your full name')} required />
                        </div>
                        <div>
                            <label htmlFor="specialization" className={labelClasses}>
                                {t('Specialization')}
                            </label>
                            <input type="text" id="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} className={inputClasses} placeholder={t('e.g., Cardiology, Pediatrics')} required />
                        </div>
                        <div>
                            <label htmlFor="email" className={labelClasses}>
                                {t('Email Address')}
                            </label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} placeholder={t('your.email@example.com')} required />
                        </div>
                        <div>
                            <label htmlFor="phone" className={labelClasses}>
                                {t('Phone Number')}
                            </label>
                            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClasses} placeholder={t('e.g., +123 456 7890')} />
                        </div>
                        <div>
                            <label htmlFor="gender" className={labelClasses}>
                                {t('Gender')}
                            </label>
                            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className={inputClasses}>
                                <option value="male">{t('Male')}</option>
                                <option value="female">{t('Female')}</option>
                                <option value="other">{t('Other')}</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="dob" className={labelClasses}>
                                {t('Date of Birth')}
                            </label>
                            <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} className={inputClasses} />
                        </div>
                    </div>
                </div>

                {/* Combined About & Contact, Education, and Experience Section */}
                <div className={mainSectionBoxClasses}>
                    {/* [REMOVED] About and Contact Sub-section */}
                    {/* Ab Biography aur Clinic Address yahan maujood nahi hain */}

                    {/* Education Sub-section */}
                    <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className={subSectionTitleClasses}>{t('Education')}</h3>
                        <div className="space-y-4">
                            {education.map((edu, index) => (
                                <div key={index} className={`${eduExpEntryClasses} ${themeColors.cardBgClass === 'bg-white' ? 'bg-blue-50/70' : 'bg-blue-900/40'}`}>
                                    <div>
                                        <label htmlFor={`edu-degree-${index}`} className={labelClasses}>{t('Degree')}</label>
                                        <input
                                            type="text"
                                            id={`edu-degree-${index}`}
                                            value={edu.degree || ''}
                                            onChange={(e) => handleListChange(setEducation, index, 'degree', e.target.value)}
                                            className={inputClasses}
                                            placeholder={t('e.g., MBBS, MD')}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`edu-institution-${index}`} className={labelClasses}>{t('Institution')}</label>
                                        <input
                                            type="text"
                                            id={`edu-institution-${index}`}
                                            value={edu.institution || ''}
                                            onChange={(e) => handleListChange(setEducation, index, 'institution', e.target.value)}
                                            className={inputClasses}
                                            placeholder={t('e.g., University of Health Sciences')}
                                        />
                                    </div>
                                    <div className="flex items-end space-x-3">
                                        <div className="flex-grow">
                                            <label htmlFor={`edu-year-${index}`} className={labelClasses}>{t('Year')}</label>
                                            <input
                                                type="text"
                                                id={`edu-year-${index}`}
                                                value={edu.year || ''}
                                                onChange={(e) => handleListChange(setEducation, index, 'year', e.target.value)}
                                                className={inputClasses}
                                                placeholder={t('e.g., 2010')}
                                            />
                                        </div>
                                        {education.length > 1 && (
                                            <button type="button" onClick={() => removeListItem(setEducation, index)} className={removeButtonClasses}>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={() => addListItem(setEducation)} className={addButtonClasses}>
                                {t('Add Education')}
                            </button>
                        </div>
                    </div>

                    {/* Experience Sub-section */}
                    <div>
                        <h3 className={subSectionTitleClasses}>{t('Experience')}</h3>
                        <div className="space-y-4">
                            {experience.map((exp, index) => (
                                <div key={index} className={`${eduExpEntryClasses} ${themeColors.cardBgClass === 'bg-white' ? 'bg-green-50/70' : 'bg-green-900/40'}`}>
                                    <div>
                                        <label htmlFor={`exp-title-${index}`} className={labelClasses}>{t('Title')}</label>
                                        <input
                                            type="text"
                                            id={`exp-title-${index}`}
                                            value={exp.title || ''}
                                            onChange={(e) => handleListChange(setExperience, index, 'title', e.target.value)}
                                            className={inputClasses}
                                            placeholder={t('e.g., Senior Resident, Consultant')}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`exp-hospital-${index}`} className={labelClasses}>{t('Hospital/Clinic')}</label>
                                        <input
                                            type="text"
                                            id={`exp-hospital-${index}`}
                                            value={exp.hospital || ''}
                                            onChange={(e) => handleListChange(setExperience, index, 'hospital', e.target.value)}
                                            className={inputClasses}
                                            placeholder={t('e.g., City General Hospital')}
                                        />
                                    </div>
                                    <div className="flex items-end space-x-3">
                                        <div className="flex-grow">
                                            <label htmlFor={`exp-years-${index}`} className={labelClasses}>{t('Years')}</label>
                                            <input
                                                type="text"
                                                id={`exp-years-${index}`}
                                                value={exp.years || ''}
                                                onChange={(e) => handleListChange(setExperience, index, 'years', e.target.value)}
                                                className={inputClasses}
                                                placeholder={t('e.g., 5 years')}
                                            />
                                        </div>
                                        {experience.length > 1 && (
                                            <button type="button" onClick={() => removeListItem(setExperience, index)} className={removeButtonClasses}>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={() => addListItem(setExperience)} className={addButtonClasses}>
                                {t('Add Experience')}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center space-x-6 pt-4">
                    <button
                        type="submit"
                        className={`${themeColors.buttonPrimaryClass} px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-${themeColors.primary || 'blue'}-500 focus:ring-opacity-60 ${isSaving ? 'opacity-70 cursor-not-allowed animate-pulse' : ''}`}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {t('Saving...')}
                            </span>
                        ) : (
                            t('Save Profile')
                        )}
                    </button>
                </div>
            </form>
        </Card>
    );
};

export default DoctorProfile;