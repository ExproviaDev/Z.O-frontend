import RoundStatusCard from "@/app/Components/RoundStatusCard/RoundStatusCard";

export default function page() {
  return (
    <main className="border-2 border-red-500 p-5 shadow-lg rounded-xl ">
      <h1 className="text-2xl lg:text-3xl font-semibold mb-4 lg:mb-6">
        My Quizzes
      </h1>
      <div className="mx-auto space-y-4">
        <RoundStatusCard
          title="Preliminary Round"
          date="2025-03-15"
          score={85}
          maxScore={100}
          status="completed"
        />
        <RoundStatusCard
          title="Division Round"
          date="2025-03-15"
          score={0}
          maxScore={100}
          status="Start Quiz"
        />
        <RoundStatusCard
          title="National Final"
          date="2025-03-15"
          score={0}
          maxScore={100}
          status="Locked"
        />
      </div>
    </main>
  );
}
