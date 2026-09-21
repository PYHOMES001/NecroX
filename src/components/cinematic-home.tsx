"use client";
import {useEffect} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
export default function CinematicHome(){useEffect(()=>{gsap.registerPlugin(ScrollTrigger);const ctx=gsap.context(()=>{gsap.from("[data-hero-kicker]",{opacity:0,y:16,duration:.8,ease:"power3.out"});gsap.from("[data-hero-line]",{opacity:0,y:90,rotateX:18,stagger:.12,duration:1.1,ease:"power4.out"});gsap.from("[data-hero-copy]",{opacity:0,y:22,duration:.8,delay:.45});gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(el=>gsap.from(el,{scrollTrigger:{trigger:el,start:"top 82%"},opacity:0,y:55,duration:.85,ease:"power3.out"}));gsap.utils.toArray<HTMLElement>("[data-card]").forEach((el,i)=>gsap.from(el,{scrollTrigger:{trigger:el,start:"top 88%"},opacity:0,y:60,rotateX:8,duration:.8,delay:i*.05,ease:"power3.out"}));});return()=>ctx.revert();},[]);return null;}
