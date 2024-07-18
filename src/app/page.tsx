import { Error } from "@components/common/Error";
import { getCommitActivity } from "@services/commitActivity";
import { CommitActivity } from "@components/commitActivity/CommitActivity";
import styles from "./page.module.css";

export default async function Home() {
  const { data, error } = await getCommitActivity();

  if (error || !data) {
    return <Error />;
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Commit Activity</h1>
      <CommitActivity data={data} />
    </main>
  );
}
