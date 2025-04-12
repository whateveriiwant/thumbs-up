import GithubFooter from "../../assets/footer/githubFooter.svg?react";
import LinkedInFooter from "../../assets/footer/linkedinFooter.svg?react";
import VelogFooter from "../../assets/footer/velogFooter.svg?react";

const Footer = () => {
  return (
    <div className="flex flex-row ml-3 justify-between items-center w-[7.5rem]">
      <GithubFooter
        fill="#C5C3C3"
        width="2.5rem"
        height="2.5rem"
        className="transition-colors duration-200 ease-in-out hover:cursor-pointer hover:fill-[#24292E]"
      />
      <LinkedInFooter
        fill="#C5C3C3"
        width="2.5rem"
        height="2.5rem"
        className="-ml-[0.24rem] transition-colors duration-200 ease-in-out hover:cursor-pointer hover:fill-[#0077B5]"
      />
      {/* prettier-ignore */}
      <VelogFooter
                fill="#C5C3C3" width="1.9rem" height="1.9rem"
                className="transition-colors duration-200 ease-in-out hover:cursor-pointer hover:fill-[#20C997]"
              />
    </div>
  );
};

export default Footer;
