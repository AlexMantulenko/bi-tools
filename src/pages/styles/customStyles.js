const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      minHeight: '28px',
      height: '28px',
      width: '170px',
      fontSize: '12px',
      boxShadow: state.isFocused ? null : null,
    }),

    menu: (provided, state) => ({
        ...provided,
        minHeight: '70px',
        maxWidth: '170px',
        fontSize: '12px'
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '24px',
      padding: '0 6px'
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '24px',
    }),
};

export default customStyles;