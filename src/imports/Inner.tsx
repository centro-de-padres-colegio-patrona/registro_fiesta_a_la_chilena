function Text() {
  return (
    <section aria-label="Event location" className="box-border content-stretch flex flex-col font-['Roboto_Mono:Regular',_sans-serif] font-normal gap-2.5 items-start justify-start leading-[0] overflow-visible p-0 relative shrink-0 text-[#ffffff] text-[14px] tracking-[-0.42px] w-56" data-name="text">
      <div className="flex flex-col justify-center min-w-full relative shrink-0" style={{ width: "min-content" }}>
        <p className="leading-[0.9]">Lugar:</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-[234px]">
        <p className="leading-[0.9]">Alicahue # 7370, La Florida</p>
      </div>
    </section>
  );
}

function Text1() {
  return (
    <section aria-label="Event Date" className="box-border content-stretch flex flex-col font-['Roboto_Mono:Regular',_sans-serif] font-normal gap-2.5 items-start justify-start leading-[0] overflow-visible p-0 relative shrink-0 text-[#ffffff] text-[14px] tracking-[-0.42px]" data-name="text">
      <div className="flex flex-col justify-center min-w-full relative shrink-0" style={{ width: "min-content" }}>
        <p className="leading-[0.9]">Fecha:</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-nowrap">
        <p className="leading-[0.9] whitespace-pre">6 de Septiembre, 2025</p>
      </div>
    </section>
  );
}

function Meta() {
  return (
    <div className="content-stretch flex gap-10 items-center justify-start relative shrink-0 w-full" data-name="meta">
      <Text />
      <Text1 />
    </div>
  );
}

function Component1() {
  return (
    <section aria-label="Event agenda item" className="box-border content-stretch flex flex-col gap-[5px] items-start justify-start leading-[0] not-italic overflow-visible p-0 relative shrink-0 text-[#ffffff] w-full" data-name="1">
      <div className="flex flex-col font-['Roboto_Flex:SemiBold',_sans-serif] font-semibold justify-center relative shrink-0 text-[32px] tracking-[-0.96px] w-full" style={{ fontVariationSettings: "'GRAD' 0, 'XOPQ' 96, 'XTRA' 468, 'YOPQ' 79, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738, 'YTLC' 514, 'YTUC' 712, 'wdth' 100" }}>
        <p className="leading-[1.2]">9:30 Pre-Kinder y Kinder</p>
      </div>
      <div className="flex flex-col font-['Roboto_Flex:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-[12px] tracking-[-0.36px] w-full" style={{ fontVariationSettings: "'GRAD' 0, 'XOPQ' 96, 'XTRA' 468, 'YOPQ' 79, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738, 'YTLC' 514, 'YTUC' 712, 'wdth' 100" }}>
        <ul className="css-ed5n1g">
          <li className="list-disc ms-[18px]">
            <span className="leading-[1.4]">Receso a las 10:00</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Component2() {
  return (
    <section aria-label="Event agenda item" className="box-border content-stretch flex flex-col gap-[5px] items-start justify-start leading-[0] not-italic overflow-visible p-0 relative shrink-0 text-[#ffffff] w-full" data-name="2">
      <div className="flex flex-col font-['Roboto_Flex:SemiBold',_sans-serif] font-semibold justify-center relative shrink-0 text-[32px] tracking-[-0.96px] w-full" style={{ fontVariationSettings: "'GRAD' 0, 'XOPQ' 96, 'XTRA' 468, 'YOPQ' 79, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738, 'YTLC' 514, 'YTUC' 712, 'wdth' 100" }}>
        <p className="leading-[1.2] whitespace-pre-wrap">{`10:20 3° y  4° Básicos`}</p>
      </div>
      <div className="flex flex-col font-['Roboto_Flex:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-[12px] tracking-[-0.36px] w-full" style={{ fontVariationSettings: "'GRAD' 0, 'XOPQ' 96, 'XTRA' 468, 'YOPQ' 79, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738, 'YTLC' 514, 'YTUC' 712, 'wdth' 100" }}>
        <ul className="css-ed5n1g">
          <ul className="css-ed5n1g">
            <li className="list-disc ms-9">
              <span className="leading-[1.4]">10:50 Receso</span>
            </li>
          </ul>
        </ul>
      </div>
    </section>
  );
}

function Component3() {
  return (
    <section aria-label="Event agenda item" className="box-border content-stretch flex flex-col gap-[5px] items-start justify-start leading-[0] not-italic overflow-visible p-0 relative shrink-0 text-[#ffffff] w-full" data-name="3">
      <div className="flex flex-col font-['Roboto_Flex:SemiBold',_sans-serif] font-semibold justify-center relative shrink-0 text-[32px] tracking-[-0.96px] w-full" style={{ fontVariationSettings: "'GRAD' 0, 'XOPQ' 96, 'XTRA' 468, 'YOPQ' 79, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738, 'YTLC' 514, 'YTUC' 712, 'wdth' 100" }}>
        <p className="leading-[1.2] whitespace-pre-wrap">{`11:10 1° a  3° Medio A`}</p>
      </div>
      <div className="flex flex-col font-['Roboto_Flex:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-[12px] tracking-[-0.36px] w-full" style={{ fontVariationSettings: "'GRAD' 0, 'XOPQ' 96, 'XTRA' 468, 'YOPQ' 79, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738, 'YTLC' 514, 'YTUC' 712, 'wdth' 100" }}>
        <ul className="css-ed5n1g">
          <li className="list-disc ms-[18px]">
            <span className="leading-[1.4]">Receso a las 11:40</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Component4() {
  return (
    <section aria-label="Event agenda item" className="box-border content-stretch flex flex-col gap-[5px] items-start justify-start leading-[0] not-italic overflow-visible p-0 relative shrink-0 text-[#ffffff] w-full" data-name="4">
      <div className="flex flex-col font-['Roboto_Flex:SemiBold',_sans-serif] font-semibold justify-center relative shrink-0 text-[32px] tracking-[-0.96px] w-full" style={{ fontVariationSettings: "'GRAD' 0, 'XOPQ' 96, 'XTRA' 468, 'YOPQ' 79, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738, 'YTLC' 514, 'YTUC' 712, 'wdth' 100" }}>
        <p className="leading-[1.2] whitespace-pre-wrap">{`12:00 1° y  2° Básicos`}</p>
      </div>
      <div className="flex flex-col font-['Roboto_Flex:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-[12px] tracking-[-0.36px] w-full" style={{ fontVariationSettings: "'GRAD' 0, 'XOPQ' 96, 'XTRA' 468, 'YOPQ' 79, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738, 'YTLC' 514, 'YTUC' 712, 'wdth' 100" }}>
        <ul className="css-ed5n1g">
          <li className="list-disc ms-[18px]">
            <span className="leading-[1.4]">Cierre de colegio de 12:30 hasta las 14:00</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Component5() {
  return (
    <section aria-label="Event agenda item" className="box-border content-stretch flex flex-col gap-[5px] items-start justify-start leading-[0] not-italic overflow-visible p-0 relative shrink-0 text-[#ffffff] w-full" data-name="5">
      <div className="flex flex-col font-['Roboto_Flex:SemiBold',_sans-serif] font-semibold justify-center relative shrink-0 text-[32px] tracking-[-0.96px] w-full" style={{ fontVariationSettings: "'GRAD' 0, 'XOPQ' 96, 'XTRA' 468, 'YOPQ' 79, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738, 'YTLC' 514, 'YTUC' 712, 'wdth' 100" }}>
        <p className="leading-[1.2] whitespace-pre-wrap">{`14:30 1° a  3° Medio B`}</p>
      </div>
      <div className="flex flex-col font-['Roboto_Flex:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-[12px] tracking-[-0.36px] w-full" style={{ fontVariationSettings: "'GRAD' 0, 'XOPQ' 96, 'XTRA' 468, 'YOPQ' 79, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738, 'YTLC' 514, 'YTUC' 712, 'wdth' 100" }}>
        <ul className="css-ed5n1g">
          <li className="list-disc ms-[18px]">
            <span className="leading-[1.4]">Receso a las 15:00</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Component6() {
  return (
    <section aria-label="Event agenda item" className="box-border content-stretch flex flex-col gap-[5px] items-start justify-start leading-[0] not-italic overflow-visible p-0 relative shrink-0 text-[#ffffff] w-full" data-name="6">
      <div className="flex flex-col font-['Roboto_Flex:SemiBold',_sans-serif] font-semibold justify-center relative shrink-0 text-[32px] tracking-[-0.96px] w-full" style={{ fontVariationSettings: "'GRAD' 0, 'XOPQ' 96, 'XTRA' 468, 'YOPQ' 79, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738, 'YTLC' 514, 'YTUC' 712, 'wdth' 100" }}>
        <p className="leading-[1.2] whitespace-pre-wrap">{`15:20 7° y  8° Básicos`}</p>
      </div>
      <div className="flex flex-col font-['Roboto_Flex:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-[12px] tracking-[-0.36px] w-full" style={{ fontVariationSettings: "'GRAD' 0, 'XOPQ' 96, 'XTRA' 468, 'YOPQ' 79, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738, 'YTLC' 514, 'YTUC' 712, 'wdth' 100" }}>
        <ul className="css-ed5n1g">
          <li className="list-disc ms-[18px]">
            <span className="leading-[1.4]">Receso a las 15:50</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Component7() {
  return (
    <section aria-label="Event agenda item" className="box-border content-stretch flex flex-col gap-[5px] items-start justify-start leading-[0] not-italic overflow-visible p-0 relative shrink-0 text-[#ffffff] w-full" data-name="7">
      <div className="flex flex-col font-['Roboto_Flex:SemiBold',_sans-serif] font-semibold justify-center relative shrink-0 text-[32px] tracking-[-0.96px] w-full" style={{ fontVariationSettings: "'GRAD' 0, 'XOPQ' 96, 'XTRA' 468, 'YOPQ' 79, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738, 'YTLC' 514, 'YTUC' 712, 'wdth' 100" }}>
        <p className="leading-[1.2] whitespace-pre-wrap">{`14:10 5° y  6° Básicos`}</p>
      </div>
      <div className="flex flex-col font-['Roboto_Flex:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-[12px] tracking-[-0.36px] w-full" style={{ fontVariationSettings: "'GRAD' 0, 'XOPQ' 96, 'XTRA' 468, 'YOPQ' 79, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738, 'YTLC' 514, 'YTUC' 712, 'wdth' 100" }}>
        <ul className="css-ed5n1g">
          <li className="list-disc ms-[18px]">
            <span className="leading-[1.4]">Receso a las 16:40</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Component8() {
  return (
    <section aria-label="Event agenda item" className="box-border content-stretch flex flex-col gap-[5px] items-start justify-start overflow-visible p-0 relative shrink-0 w-full" data-name="8">
      <div className="flex flex-col font-['Roboto_Flex:SemiBold',_sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[32px] tracking-[-0.96px] w-full" style={{ fontVariationSettings: "'GRAD' 0, 'XOPQ' 96, 'XTRA' 468, 'YOPQ' 79, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738, 'YTLC' 514, 'YTUC' 712, 'wdth' 100" }}>
        <p className="leading-[1.2] whitespace-pre-wrap">{`17:00 4° Medio A y  4° Medio B`}</p>
      </div>
    </section>
  );
}

function Table() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-center justify-center relative shrink-0 w-full" data-name="table">
      <Component1 />
      <Component2 />
      <Component3 />
      <Component4 />
      <Component5 />
      <Component6 />
      <Component7 />
      <Component8 />
    </div>
  );
}

function ContentSpacing() {
  return (
    <div className="content-stretch flex gap-2.5 items-center justify-start opacity-60 relative shrink-0" data-name="content spacing">
      <div className="flex flex-col font-['Roboto_Mono:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#000000] text-[16px] text-center text-nowrap tracking-[-0.48px] uppercase">
        <p className="leading-[1.4] whitespace-pre">Registrate</p>
      </div>
    </div>
  );
}

function Btn() {
  return (
    <a aria-label="Link to take you to event registration" className="bg-[#95ff8d] box-border content-stretch cursor-pointer flex gap-1.5 h-9 items-center justify-start overflow-visible px-[19px] py-3 relative rounded-[24.5px] shrink-0" data-name="btn" href="https://www.figma.com/sites">
      <ContentSpacing />
    </a>
  );
}

export default function Inner() {
  return (
    <div className="relative size-full" data-name="inner">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[50px] items-start justify-start px-[89px] py-[100px] relative size-full">
          <Meta />
          <Table />
          <Btn />
        </div>
      </div>
    </div>
  );
}