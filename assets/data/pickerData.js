const pickerItems = {
  kidneyTypes: {
    items: [
      {label: '투석전단계<신증후군>', value: 1},
      {label: '투석전단계<만성신부전>', value: 2},
      {label: '신장이식<신장이식후~8주>', value: 3},
      {label: '신장이식<신장이식8주후>', value: 4},
      {label: '혈액투석', value: 5},
      {label: '복막투석', value: 6},
      {label: '해당없음', value: 7},
    ],
    placeholder: ({label, value, color} = {}) => ({
      label: label || '건강상태를 선택해주세요.',
      value: value || null,
      color: color || '#9EA044',
    }),
  },
  activityTypes: {
    items: [
      {label: '비활동적', value: 1},
      {label: '저활동적', value: 2},
      {label: '활동적', value: 3},
      {label: '매우 활동적', value: 4},
    ],
    placeholder: ({label, value, color} = {}) => ({
      label: label || '활동상태를 선택해주세요.',
      value: value || null,
      color: color || '#9EA044',
    }),
  },
  MealTypes: {
    items: [
      {label: '아침', value: 1},
      {label: '점심', value: 2},
      {label: '저녁', value: 3},
      {label: '간식', value: 4},
    ],
    placeholder: ({label, value, color} = {}) => ({
      label: label || '식사시기를 선택해주세요.',
      value: value || null,
      color: color || '#9EA044',
    }),
  },
};

export {pickerItems};
