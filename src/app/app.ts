import { Component, computed, ElementRef, signal, viewChild } from '@angular/core';
import { calculateResult, QUESTIONS, PROFILES } from './quiz-data';
@Component({selector:'app-root',templateUrl:'./app.html'})
export class App {
 readonly questions=QUESTIONS; readonly profiles=PROFILES;
 stage=signal<'intro'|'quiz'|'result'>('intro');index=signal(0);answers=signal<readonly string[]>([]);
 current=computed(()=>QUESTIONS[this.index()]);selected=computed(()=>this.answers()[this.index()]??'');result=computed(()=>calculateResult(this.answers()));
 heading=viewChild<ElementRef<HTMLElement>>('heading');
 progress=computed(()=>Math.round(this.answers().filter(Boolean).length/QUESTIONS.length*100));
 start(){this.stage.set('quiz');this.focusHeading();}
 choose(id:string){if(this.stage()!=='quiz'||!this.current().options.some(o=>o.id===id))return;this.answers.update(a=>{const next=[...a];next[this.index()]=id;return next;});}
 next(){if(this.stage()!=='quiz'||!this.selected())return;if(this.index()<QUESTIONS.length-1)this.index.update(i=>i+1);else if(this.result())this.stage.set('result');this.focusHeading();}
 back(){if(this.stage()==='result'){this.stage.set('quiz');this.index.set(QUESTIONS.length-1);}else if(this.index()>0)this.index.update(i=>i-1);else this.stage.set('intro');this.focusHeading();}
 restart(){this.answers.set([]);this.index.set(0);this.stage.set('intro');this.focusHeading();}
 percent(count:number){return Math.round(count/QUESTIONS.length*100);}
 private focusHeading(){setTimeout(()=>this.heading()?.nativeElement.focus());}
}
