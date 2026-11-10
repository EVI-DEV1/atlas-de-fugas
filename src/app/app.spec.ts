import { TestBed } from '@angular/core/testing';
import { describe, it, expect } from 'vitest';
import { App } from './app';
import { calculateResult, QUESTIONS, PROFILES } from './quiz-data';
const answersFor=(profile:string)=>QUESTIONS.map(q=>q.options.find(o=>o.profile===profile)!.id);
describe('Resultado editorial',()=>{
 it('mapeia as opções por pergunta e identifica cada perfil dominante',()=>{
  for(const p of PROFILES){const result=calculateResult(answersFor(p.id));expect(result?.profile.id).toBe(p.id);expect(result?.counts[p.id]).toBe(6);expect(result?.tied).toBe(false);}
 });
 it('rejeita respostas incompletas, desconhecidas e excedentes',()=>{
  expect(calculateResult([])).toBeNull();expect(calculateResult(['x','x','x','x','x','x'])).toBeNull();expect(calculateResult([...answersFor('mar'),'a'])).toBeNull();
 });
 it('desempata entre líderes pelo primeiro estilo escolhido, mesmo com outro perfil primeiro',()=>{
  const sequence=['cidade','mar','trilha','refugio','trilha','mar'];
  const result=calculateResult(QUESTIONS.map((q,i)=>q.options.find(o=>o.profile===sequence[i])!.id));
  expect(result?.tied).toBe(true);expect(result?.profile.id).toBe('mar');expect(result?.counts).toEqual({trilha:2,mar:2,cidade:1,refugio:1});
 });
 it('calcula todos os 4096 percursos e preserva soma, dominante e desempate',()=>{
  for(let n=0;n<4096;n++){
   let cursor=n;const picked=QUESTIONS.map(q=>{const o=q.options[cursor%4];cursor=Math.floor(cursor/4);return o;});
   const result=calculateResult(picked.map(o=>o.id))!;
   expect(result).not.toBeNull();expect(Object.values(result.counts).reduce((a,b)=>a+b,0)).toBe(6);
   const max=Math.max(...Object.values(result.counts));expect(result.counts[result.profile.id]).toBe(max);
   expect(result.profile.id).toBe(picked.find(o=>result.counts[o.profile]===max)!.profile);
  }
 });
});
describe('Fluxo renderizado',()=>{
 it('exige seleção, mantém uma resposta por pergunta e permite revisar antes de revelar novamente',async()=>{
  const f=TestBed.createComponent(App);await f.whenStable();const root=f.nativeElement as HTMLElement;
  (root.querySelector('.intro .primary') as HTMLButtonElement).click();await f.whenStable();
  expect((root.querySelector('.quiz-actions .primary') as HTMLButtonElement).disabled).toBe(true);
  for(let i=0;i<6;i++){
   const option=root.querySelectorAll('.choice')[i%4] as HTMLButtonElement;option.click();option.click();await f.whenStable();
   expect(root.querySelectorAll('.choice[aria-pressed="true"]')).toHaveLength(1);
   (root.querySelector('.quiz-actions .primary') as HTMLButtonElement).click();await f.whenStable();
  }
  expect(root.querySelector('.result')).not.toBeNull();expect(f.componentInstance.answers()).toHaveLength(6);
  const previous=f.componentInstance.result()!.counts;
  f.componentInstance.back();await f.whenStable();
  expect(f.componentInstance.index()).toBe(5);const old=f.componentInstance.selected();
  const different=QUESTIONS[5].options.find(o=>o.id!==old)!;f.componentInstance.choose(different.id);f.componentInstance.next();await f.whenStable();
  expect(f.componentInstance.stage()).toBe('result');expect(f.componentInstance.result()!.counts).not.toEqual(previous);
  f.componentInstance.restart();await f.whenStable();expect(root.querySelector('.intro')).not.toBeNull();expect(f.componentInstance.answers()).toEqual([]);expect(f.componentInstance.result()).toBeNull();
 });
 it('não avança nem altera o resultado por ações fora do estágio de perguntas',()=>{
  const f=TestBed.createComponent(App);const app=f.componentInstance;
  app.choose('a');app.next();expect(app.stage()).toBe('intro');expect(app.answers()).toEqual([]);
  app.start();app.choose('invalid');app.next();expect(app.index()).toBe(0);expect(app.answers()).toEqual([]);
 });
});
