import React, { useState } from 'react';
import '../components/applyForm.css';

function ApplyForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    instagram: '',
    zodiac: '',
    cuddleRating: 3,
    punTolerance: 3,
    sharesFood: true,
    handlesWeirdness: true,
    showerSingingReaction: 'join',
    idealDate: 'netflix',
    petApproval: false,
    terms: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 
        (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000');
      const response = await fetch(`${backendUrl}/api/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Application submitted successfully:', result.message);
        setSubmitted(true);
      } else {
        const error = await response.json();
        console.error('Error submitting application:', error);
        alert('Failed to submit application: ' + error.error);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="submission-message">
        <h2>Application Received! 🎉</h2>
        <p>Thank you, {formData.nickname || formData.name || "Applicant"}, for your submission.</p>
        <p>Your cuddle rating of {formData.cuddleRating}/5 and pun tolerance of {formData.punTolerance}/5 are being carefully reviewed.</p>
        <p>{formData.petApproval ? "✅ Pet approval noted (good choice)" : "❌ No pets? We'll talk."}</p>
        <button onClick={() => setSubmitted(false)}>Submit Another Application</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1 className="application-title">Girlfriend Application Form</h1>
      <p className="disclaimer">Disclaimer: Approval subject to chemistry, humor, and snack-sharing compatibility.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>📝 Personal Details</h2>
          <label>
            Full Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="18"
              required
            />
          </label>

          <label>
            Instagram Handle:
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
            />
          </label>

          <label>
            Zodiac Sign:
            <select name="zodiac" value={formData.zodiac} onChange={handleChange}>
              <option value="">Select...</option>
              <option value="aries">♈ Aries</option>
              <option value="taurus">♉ Taurus</option>
              <option value="gemini">♊ Gemini</option>
              <option value="cancer">♋ Cancer</option>
              <option value="leo">♌ Leo</option>
              <option value="virgo">♍ Virgo</option>
              <option value="libra">♎ Libra</option>
              <option value="scorpio">♏ Scorpio</option>
              <option value="sagittarius">♐ Sagittarius</option>
              <option value="capricorn">♑ Capricorn</option>
              <option value="aquarius">♒ Aquarius</option>
              <option value="pisces">♓ Pisces</option>
            </select>
          </label>
        </div>

        <div className="form-section">
          <h2>✔️ Skills & Qualifications</h2>

          <label>
            Strength in cuddling:
            <input
              type="range"
              name="cuddleRating"
              min="1"
              max="5"
              value={formData.cuddleRating}
              onChange={handleChange}
            />
            <span>{formData.cuddleRating}/5</span>
          </label>

          <label>
            Tolerance for bad puns:
            <input
              type="range"
              name="punTolerance"
              min="1"
              max="5"
              value={formData.punTolerance}
              onChange={handleChange}
            />
            <span>{formData.punTolerance}/5</span>
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              name="sharesFood"
              checked={formData.sharesFood}
              onChange={handleChange}
            />
            Willing to share food (last fry clause applies)
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              name="handlesWeirdness"
              checked={formData.handlesWeirdness}
              onChange={handleChange}
            />
            Can handle my weirdness
          </label>
        </div>

        <div className="form-section">
          <h2>💑 Scenario Responses</h2>

          <fieldset>
            <legend>If I sing in the shower, you will:</legend>
            <label>
              <input
                type="radio"
                name="showerSingingReaction"
                value="join"
                checked={formData.showerSingingReaction === 'join'}
                onChange={handleChange}
              />
              Join in harmoniously
            </label>
            <label>
              <input
                type="radio"
                name="showerSingingReaction"
                value="record"
                checked={formData.showerSingingReaction === 'record'}
                onChange={handleChange}
              />
              Record and blackmail me later
            </label>
            <label>
              <input
                type="radio"
                name="showerSingingReaction"
                value="ignore"
                checked={formData.showerSingingReaction === 'ignore'}
                onChange={handleChange}
              />
              Pretend you hear nothing
            </label>
          </fieldset>

          <fieldset>
            <legend>Our ideal date is:</legend>
            <label>
              <input
                type="radio"
                name="idealDate"
                value="netflix"
                checked={formData.idealDate === 'netflix'}
                onChange={handleChange}
              />
              Netflix + takeout
            </label>
            <label>
              <input
                type="radio"
                name="idealDate"
                value="roadtrip"
                checked={formData.idealDate === 'roadtrip'}
                onChange={handleChange}
              />
              Spontaneous road trip
            </label>
            <label>
              <input
                type="radio"
                name="idealDate"
                value="fancy"
                checked={formData.idealDate === 'fancy'}
                onChange={handleChange}
              />
              Fancy dinner (with pajamas underneath)
            </label>
          </fieldset>
        </div>

        <div className="form-section">
          <h2>🐾 References</h2>
          <label className="checkbox">
            <input
              type="checkbox"
              name="petApproval"
              checked={formData.petApproval}
              onChange={handleChange}
            />
            Pet approval (Dogs' votes count double)
          </label>
        </div>

        <div className="form-section">
          <h2>📜 Terms & Conditions</h2>
          <label className="checkbox">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            I agree to: laugh at 60% of your jokes, "not" steal hoodies, and fight over the thermostat
          </label>
        </div>

        <button type="submit" disabled={!formData.terms}>
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default ApplyForm;