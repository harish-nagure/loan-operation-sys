import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const basicInfoFields = ["firstName", "lastName", "mobile", "email", "confirmEmail"];
const applicationDetailFields = [
  "dob", "monthlyIncome", "ssn", "confirmSsn", "amountNeeded",
  "homeAddress", "homeAddress2", "zipCode", "city", "state",
  "homeowner", "agreeTerms", "authorizeCredit"
];

const FormFieldSettings = ({ fieldSettings = {}, setFieldSettings = () => {} }) => {
  const [localSettings, setLocalSettings] = useState(fieldSettings);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newField, setNewField] = useState({
    name: "",
    type: "text",
    targetForm: "basicInfo",
    enabled: true,
  });

  const [dynamicFields, setDynamicFields] = useState({
    basicInfo: [],
    applicationDetail: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    setLocalSettings(fieldSettings);
  }, [fieldSettings]);

  const handleToggle = (field, status) => {
    setLocalSettings((prev) => ({
      ...prev,
      [field]: status,
    }));
  };

  const handleApply = () => {
    setFieldSettings(localSettings);
    alert("Settings applied!");
    navigate("/application_form");
  };

  const handleAddNewField = () => {
    if (!newField.name.trim()) return alert("Field name is required");

    const formattedName = newField.name.trim().replace(/\s+/g, "");
    const target = newField.targetForm;

    setDynamicFields((prev) => ({
      ...prev,
      [target]: [...prev[target], formattedName],
    }));

    setLocalSettings((prev) => ({
      ...prev,
      [formattedName]: newField.enabled,
    }));

    setNewField({ name: "", type: "text", targetForm: "basicInfo", enabled: true });
    setShowAddForm(false);
  };

  const renderFieldRows = (fields) =>
    fields.map((field) => {
      const formattedLabel = field.replace(/([A-Z])/g, " $1");

      return (
        <tr key={field} className="border-b hover:bg-gray-50">
          <td className="p-2 capitalize text-gray-700">{formattedLabel}</td>
          <td className="p-2 text-center">
            <input
              type="checkbox"
              checked={!!localSettings[field]}
              onChange={(e) => handleToggle(field, e.target.checked)}
            />
          </td>
        </tr>
      );
    });

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Form Field Settings
      </h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Input Field
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200 text-left text-sm text-gray-700 sticky top-0">
            <tr>
              <th className="p-2">Field</th>
              <th className="p-2 text-center">Enabled</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="2" className="bg-blue-50 text-blue-800 font-semibold p-2">
                Basic Info Fields
              </td>
            </tr>
            {renderFieldRows([...basicInfoFields, ...dynamicFields.basicInfo])}

            <tr>
              <td colSpan="2" className="bg-green-50 text-green-800 font-semibold p-2">
                Application Detail Fields
              </td>
            </tr>
            {renderFieldRows([...applicationDetailFields, ...dynamicFields.applicationDetail])}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleApply}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Apply Settings
        </button>
      </div>

      {/* Modal for Adding New Field */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Input Field</h3>

            <input
              type="text"
              placeholder="Field Name"
              className="w-full border px-3 py-2 mb-3 rounded"
              value={newField.name}
              onChange={(e) => setNewField({ ...newField, name: e.target.value })}
            />

            <select
              className="w-full border px-3 py-2 mb-3 rounded"
              value={newField.type}
              onChange={(e) => setNewField({ ...newField, type: e.target.value })}
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
              <option value="email">Email</option>
            </select>

            <select
              className="w-full border px-3 py-2 mb-3 rounded"
              value={newField.targetForm}
              onChange={(e) => setNewField({ ...newField, targetForm: e.target.value })}
            >
              <option value="basicInfo">Basic Info</option>
              <option value="applicationDetail">Application Detail</option>
            </select>

            <label className="block mb-4">
              <input
                type="checkbox"
                checked={newField.enabled}
                onChange={(e) => setNewField({ ...newField, enabled: e.target.checked })}
                className="mr-2"
              />
              Enabled
            </label>

            <div className="flex justify-between">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewField}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Field
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormFieldSettings;