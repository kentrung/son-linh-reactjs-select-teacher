import { useState } from 'react';

// Define the list of teachers with their internal values and display names
const TEACHERS = [
  { value: 'teacherA', label: 'Kim Tinh' },
  { value: 'teacherB', label: 'Mộc Tinh' },
  { value: 'teacherC', label: 'Thủy Tinh' },
  { value: 'teacherD', label: 'Hỏa Tinh' },
  { value: 'teacherE', label: 'Thổ Tinh' },
];

// List of student identifiers
const STUDENTS = [1, 2, 3];

const TeacherSelection = () => {
  // State to store the selected teacher for each student
  // Example: { 1: 'teacherA', 2: '', 3: 'teacherC' }
  const [selections, setSelections] = useState({
    1: '',
    2: '',
    3: '',
  });

  /**
   * Handles the change event when a student selects a different teacher.
   * @param {number} studentId - The ID of the student (1, 2, or 3)
   * @param {string} teacherValue - The value of the selected teacher (or empty string)
   */
  const handleTeacherChange = (studentId, teacherValue) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [studentId]: teacherValue,
    }));
  };

  /**
   * Determines whether a specific teacher option should be disabled for a given student.
   * A teacher is disabled if it is already selected by another student and is not
   * the currently selected teacher of this student.
   *
   * @param {number} studentId - The ID of the student viewing the dropdown
   * @param {string} teacherValue - The value of the teacher option to check
   * @returns {boolean} - True if the option should be disabled, false otherwise
   */
  const isOptionDisabled = (studentId, teacherValue) => {
    // Empty option (placeholder) should never be disabled
    if (!teacherValue) return false;

    const currentSelection = selections[studentId];

    // The student's own current selection should remain enabled (so they can change it)
    if (teacherValue === currentSelection) return false;

    // Check if this teacher is already selected by any other student
    for (const [otherStudentId, selectedTeacher] of Object.entries(selections)) {
      if (Number(otherStudentId) !== studentId && selectedTeacher === teacherValue) {
        return true; // Teacher is taken by another student
      }
    }
    return false; // Teacher is available
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">Lựa chọn giáo viên</h1>

      {STUDENTS.map((studentId) => (
        <div className="mb-3" key={studentId}>
          <p>Học viên {studentId}</p>
          <select
            className="form-select"
            value={selections[studentId]}
            onChange={(e) => handleTeacherChange(studentId, e.target.value)}
          >
            {/* Default placeholder option */}
            <option value="">-- Chọn giáo viên --</option>

            {/* Dynamic teacher options with built-in disable logic */}
            {TEACHERS.map((teacher) => (
              <option
                key={teacher.value}
                value={teacher.value}
                disabled={isOptionDisabled(studentId, teacher.value)}
              >
                {teacher.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default TeacherSelection;