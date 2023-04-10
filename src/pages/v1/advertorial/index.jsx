import React from "react";
import "./index.css"

export default function Advertorial({ content_block }){
    return (
        <div className={`advertorial ${content_block.lander_hero_section_advertorial_color} ${content_block.lander_hero_section_advertorial_bg_color}`}>
            <p style={{ fontSize: content_block.lander_hero_section_advertorial_size + 'rem' }}>{content_block.lander_hero_section_advertorial_name}</p>
        </div>
    )
}