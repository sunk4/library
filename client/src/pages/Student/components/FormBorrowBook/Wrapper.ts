import styled from 'styled-components'

const Wrapper = styled.section`
  max-width: 50%;
  width: 30%;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 30px solid var(--primary-500);
  background-color: var(--white);
  border-radius: 20px;
  padding: 1rem;
  position: absolute;
  margin: 0 auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  h2,
  label {
    color: var(--primary-500);
  }

  label {
    margin-bottom: 0.5rem;
  }
  select {
    margin: 0.5rem 0;
    border: none;
    border-radius: 10px;
    width: 100%;
    padding: 0.375rem 0.75rem;
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
  }
  button {
    background-color: var(--primary-500);
    padding: 0.5rem;
    border-radius: 5px;
    color: var(--white);
    border: none;
    cursor: pointer;
    display: inline-block;
    width: 100%;
    margin-bottom: 0.5rem;
  }
`

export default Wrapper
