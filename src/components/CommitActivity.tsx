import { Error } from "@components/Common/Error";
import { getCommitActivity } from "@services/commitActivity";
import { ActivityGraph } from "./ActivityGraph/ActivityGraph";

export const CommitActivity = async () => {
  const { data, error } = await getCommitActivity();

  if (error || !data) {
    return <Error />;
  }

  return (
    <div>
      <ActivityGraph data={data} />
    </div>
  );
};
