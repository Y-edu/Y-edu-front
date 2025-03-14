import Image from "next/image";

export default function Brand() {
  return (
    <div className="mx-auto max-w-3xl p-6 font-sans">
      <header className="mb-8 text-center">
        <div className="relative mx-auto mb-4 size-24">
          <Image
            src="/images/y-edu-logo.png"
            alt="Y-Edu 로고"
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold">Y-Edu 맞춤 과외 플랫폼</h1>
      </header>
      <main className="mb-8">
        <section className="rounded-lg bg-gray-100 p-6">
          <p className="mb-4">
            <strong>영어 공부에 흥미를 느끼는 경험을 만들어 드립니다!</strong>
          </p>
          <p className="mb-4">
            SKY 출신 원어민급 선생님과 1:1 맞춤 수업으로 아이에게 재미와
            자신감을 선사합니다.
          </p>
          <p className="mb-4">
            <strong>주요 포인트</strong>: 1:1 방문 과외, 자유로운 선생님 교체,
            합리적인 가격 (월 12만원)
          </p>
        </section>
      </main>
      <footer className="text-center text-sm text-gray-600">
        <div className="mt-4">
          <a
            href="https://pf.kakao.com/_AFHjn/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-yellow-400 px-4 py-2 text-white hover:bg-yellow-500"
          >
            카카오 채팅 상담
          </a>
        </div>
      </footer>
    </div>
  );
}
