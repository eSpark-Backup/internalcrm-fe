import InnerHeader from "../components/common/innerHeader";

const WithHeader = (props) => {
  const {
    login,
    title,
    isActive,
    setIsActive,
    dualButton,
    handleActive,
    dualButtonText1,
    dualButtonText2,
    handleInactive,
    singleButton,
    singleButtonText,
    handleClick,
    children,
  } = props;

  return (
    <>
      <InnerHeader
        login={login}
        title={title}
        isActive={isActive}
        setIsActive={setIsActive}
        dualButton={dualButton}
        handleActive={handleActive}
        dualButtonText1={dualButtonText1}
        dualButtonText2={dualButtonText2}
        handleInactive={handleInactive}
        singleButton={singleButton}
        singleButtonText={singleButtonText}
        handleClick={handleClick}
      />
      {children}
    </>
  );
};

export default WithHeader;
