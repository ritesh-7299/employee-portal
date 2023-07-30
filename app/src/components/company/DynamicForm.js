import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

export default function DynamicForm({ type }) {
  const [fieldData, setFieldData] = useState({ name: '' });

  const handleFieldData = (e) => {
    setFieldData((fieldData) => ({
      ...fieldData,
      [e.target.name]: e.target.value,
    }));
  };

  const generateQuestions = (type) => {
    let questions = {
      label: 'Please enter label',
      placeHolder: 'Please enter placeholder',
    };

    return Object.keys(questions).forEach((question) => {
      return (
        <TextField
          required
          name={question}
          label={questions[question]}
          // value={fieldData.label}
          // onChange={handleFieldData}
        />
      );
    });
  };
  const generateFields = (data) => {
    <Box>
      <TextField
        required
        name="label"
        label="Please enter label"
        value={fieldData.label}
        onChange={handleFieldData}
      />
    </Box>;
  };
  return (
    <>
      DynamicForm form
      {type && generateQuestions(type)}
    </>
  );
}
