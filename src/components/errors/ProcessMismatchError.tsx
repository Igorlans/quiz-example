
interface ProcessMismatchErrorProps {
  expected: string;
  got: Maybe<string>;
}

const ProcessMismatchError = ({ expected, got = 'nothing' }: ProcessMismatchErrorProps) => {
  return (
    <div>
      <h1>Errror: Process types mismatched</h1>

      <p>Expected <b>{expected}</b> process type, but got <b>{got}</b> process type</p>
    </div>
  )
}

export default ProcessMismatchError