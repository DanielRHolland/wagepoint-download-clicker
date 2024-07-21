(async () => {
  const bs = [...document.getElementsByClassName('button small')]
              .filter(x => x.value === "Details »");
  const ls = [];
  let isFirstTime = true; // wait longer on first modal load
  for (b of bs) {
      b.click();
      ls.push(await new Promise(r => setTimeout(
          () => r(viewPayStubPDF.href), isFirstTime ? 4000 : 2000
      )));
      isFirstTime = false;
  }
  console.log(ls);
  if (ls.length !== new Set(ls).size) {
      console.error('Duplicates found! Increase wait time');
  } else {
      window.triggerDownloads = () =>
          ls.forEach(url => {
            const a = document.createElement('a');
            a.href = url;
            a.download = url.split('/').pop();
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          });
      window.triggerDownloads();
  }
})()
