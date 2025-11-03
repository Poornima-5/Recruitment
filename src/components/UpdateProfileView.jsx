import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { profileSchema } from "../lib/schemas";
import styles from "./UpdateProfileView.module.css";

const UpdateProfileView = ({ profile, onProfileUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    storeName: "",
    location: "",
    currency: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        storeName: profile.store_name || "",
        location: profile.location || "",
        currency: profile.currency || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
      });
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = profileSchema.parse(formData);
      setSaving(true);

      const { error } = await supabase
        .from("profiles")
        .update({
          name: validatedData.name,
          store_name: validatedData.storeName,
          location: validatedData.location,
          currency: validatedData.currency,
          email: validatedData.email,
          phone: validatedData.phone,
          address: validatedData.address,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id);

      if (error) throw error;

      alert("Profile updated successfully!");
      if (onProfileUpdate) onProfileUpdate();
    } catch (error) {
      if (error.errors) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error updating profile:", error);
        alert("Failed to update profile");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Personal Details</h2>
        <p className={styles.subtitle}>
          To change your personal detail, edit and save from here
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label htmlFor="name" className={styles.label}>
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={styles.input}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="storeName" className={styles.label}>
              Store Name
            </label>
            <input
              id="storeName"
              type="text"
              value={formData.storeName}
              onChange={(e) => handleInputChange("storeName", e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="location" className={styles.label}>
              Location
            </label>
            <select
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className={styles.select}
            >
              <option value="">Select location</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          <div className={styles.formField}>
            <label htmlFor="currency" className={styles.label}>
              Currency
            </label>
            <select
              id="currency"
              value={formData.currency}
              onChange={(e) => handleInputChange("currency", e.target.value)}
              className={styles.select}
            >
              <option value="">Select currency</option>
              <option value="India (INR)">India (INR)</option>
              <option value="United States (USD)">United States (USD)</option>
              <option value="Euro (EUR)">Euro (EUR)</option>
              <option value="British Pound (GBP)">British Pound (GBP)</option>
            </select>
          </div>

          <div className={styles.formField}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={styles.input}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          <div className={styles.formField}>
            <label htmlFor="phone" className={styles.label}>
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formField}>
          <label htmlFor="address" className={styles.label}>
            Address
          </label>
          <input
            id="address"
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.saveButton} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
          <button type="button" className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileView;
