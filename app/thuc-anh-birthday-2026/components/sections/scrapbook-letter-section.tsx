"use client";

import { motion } from "framer-motion";
import { fadeUp, PLACEHOLDER_IMG } from "../constants";
import { hl } from "../doodles";
import { PhotoFrame } from "../photo-elements";

export function ScrapbookLetterSection() {
  return (
    <motion.section
      custom={2}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="relative rounded-3xl border-2 border-slate-800/10 bg-white/92 p-6 shadow-[8px_8px_0_rgba(15,23,42,0.07)] lg:col-span-2"
    >
      <h2 className="font-[family-name:var(--font-nunito)] text-2xl font-bold text-rose-500">
        Happy Birthday {hl("Thục Anh", "bg-rose-100")}
      </h2>
      <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start">
        <p className="font-[family-name:var(--font-be-vietnam-pro)] flex-1 text-base leading-relaxed text-slate-700">
          Cô công chúa nhỏ của anh ngày hôm nay cũng đã sang Đức rồi, năm nay em đón sinh nhật hong có người thân bên cạnh thì cũng buồn lắm nhỉ, tụi mình ráng cố găng thật nhiều để sau này đạt được những mục tiêu tụi mình nói với nhau nha. Anh chúc em tuổi mới có nhiều sức khỏe, nhiều hơn nhiều thành công và hạnh phúc. Nhưng mà bên cạnh đó nhớ êu anh hơn nữa nha anh iu em nhiều lắm nè babi. Em ráng thành công hơn nữa với điều mà em chọn, hãy làm những gì mà em thích và yêu thích nha. Anh iu em nhiều lắm. Đáng lẽ đây sẽ là những bức thư tay em lưu lại rồi nhưng mà hôm nay anh viết thư online làm em cái thiệp đẹp đẹp. Anh nhớ em nhiều lắm. Em nhận được cái này thì react cho anh xem với đc hem. Em có muốn gì trong lúc này hong. Anh có làm cái wheel ở dưới giống cái ngôi sao của anh đó, dạo này anh đọc nhưng mà anh gấp lại đợi em về Việt Nam, anh đọc tiếp anh chỉ đọc ngôi sao để đỡ nhớ em xong anh gấp lại. Giờ anh muốn em về Việt Nam rồi anh gấp ra đọc tiếp, để còn kiếm cớ gặp em nữa chứ sao. Iu em nhất trên đời. Anh hong thích tính em hay cọc đó )): Anh cũng nói hay không hiểu làm em cọc nhiều mình cùng cải thiện cái đó được hem babi. Nói thiệt giờ anh nhớ em dữ lắm, em có nhớ anh thì nhắn liền anh nha, dạo này hai đứa trái múi giờ, sống kiểu ít update cho nhau hơn nhưng mà anh lại cảm thấy thiếu em tại lúc nào em cũng đi bên cạnh anh, iu anh, anh chỉ cảm thấy nhớ vậy thôi chứ anh vẫn chấp nhận được cái đó, anh take time đó để phát triển, em cũng vậy, mình cùng cố gằng tốt hơn em nhé. Anh iu em nhất trên đời 💕.
          <span className="mt-2 block text-rose-500">
            Minh Khang - Anh iu của em ✎
          </span>
        </p>
        <div className="flex shrink-0 gap-2 lg:flex-col">
          <PhotoFrame
            src='/images/thuc-anh-birthday/2026/thuc-anh-12.jpg'
            alt="Letter collage 1"
            className="h-24 w-24"
          />
          <PhotoFrame
            src='/images/thuc-anh-birthday/2026/thuc-anh-13.jpg'
            alt="Letter collage 2"
            className="h-24 w-24"
          />
          <PhotoFrame
            src='/images/thuc-anh-birthday/2026/thuc-anh-14.jpg'
            alt="Letter collage 3"
            className="h-24 w-24"
          />
        </div>
      </div>
    </motion.section>
  );
}
